import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const sourceRoot = new URL("../src/", import.meta.url);
const componentRoot = new URL("components/portfolio/", sourceRoot);
const files = [
  "pages/portfolio.tsx",
  "pages/project-outline.tsx",
  "pages/projects.tsx",
  ...readdirSync(componentRoot).filter((name) => name.endsWith(".tsx"))
    .map((name) => `components/portfolio/${name}`),
];

function parse(relativePath) {
  const path = fileURLToPath(new URL(relativePath, sourceRoot));
  return ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function elements(source) {
  const nodes = [];
  function visit(node) {
    if (ts.isJsxElement(node)) nodes.push(node);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return nodes;
}

test("editable literal text is not mixed directly with badges, icons, line breaks, or expressions", () => {
  const failures = [];
  for (const file of files) {
    const source = parse(file);
    for (const node of elements(source)) {
      const hasText = node.children.some((child) => ts.isJsxText(child) && child.text.trim());
      const hasOtherChildren = node.children.some((child) => !ts.isJsxText(child));
      if (hasText && hasOtherChildren) {
        const line = source.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        failures.push(`${file}:${line} — wrap its text in a separate plain element`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

test("both education cards expose all four text fields as separate plain elements", () => {
  const source = parse("components/portfolio/education-cards.tsx");
  const nodes = elements(source);
  const positions = new Set();
  for (const card of ["ucsi", "second"]) {
    for (const field of ["period", "school", "degree", "note"]) {
      const id = `education-${card}-${field}`;
      const matches = nodes.filter((node) => node.openingElement.attributes.properties.some((prop) =>
        ts.isJsxAttribute(prop) && prop.name.getText(source) === "id" &&
        prop.initializer && ts.isStringLiteral(prop.initializer) && prop.initializer.text === id));
      assert.equal(matches.length, 1, `${id} must have one unique element`);
      assert(matches[0].children.every(ts.isJsxText), `${id} must contain only literal text`);
      positions.add(matches[0].getStart());
    }
  }
  assert.equal(positions.size, 8, "each field must have its own source position");
});

test("project collection contains two current projects and three independent placeholder cards", () => {
  const source = parse("pages/projects.tsx");
  const cards = elements(source).filter((node) => node.openingElement.tagName.getText(source) === "article");
  assert.equal(cards.length, 5);
  const headings = cards.map((card) => {
    const heading = elements(card).find((node) => node.openingElement.tagName.getText(source) === "h2");
    assert(heading, "every project must have a heading");
    assert(heading.children.every(ts.isJsxText), "project names must be independent literal text");
    return heading.children.map((node) => node.text.trim()).join(" ");
  });
  assert.equal(headings[0], "Financial Tracker &amp; Budgeting App");
  assert.equal(headings[1], "Predictive Analytics for House Price Estimation");
  assert.equal(new Set(headings).size, 5);
  assert(cards.slice(2).every((card) => card.getText(source).includes("Additional placeholder project")));
  assert(cards[0].getText(source).includes('href="/projects/ledger-reconciliation"'));
  assert(!cards.slice(2).some((card) => card.getText(source).includes("<Link")), "unfinished projects must not have dead outline links");
});

test("homepage collection link routes to the dedicated projects page, not the old modal", () => {
  const source = parse("pages/portfolio.tsx");
  const link = elements(source).find((node) => node.openingElement.attributes.properties.some((prop) =>
    ts.isJsxAttribute(prop) && prop.name.getText(source) === "data-testid" &&
    prop.initializer && ts.isStringLiteral(prop.initializer) && prop.initializer.text === "button-view-all"));
  assert(link);
  assert.equal(link.openingElement.tagName.getText(source), "Link");
  assert(link.openingElement.attributes.properties.some((prop) =>
    ts.isJsxAttribute(prop) && prop.name.getText(source) === "href" &&
    prop.initializer && ts.isStringLiteral(prop.initializer) && prop.initializer.text === "/projects"));
});
