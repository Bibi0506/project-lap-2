const { renderDOM } = require("./helpers");

let dom, document, navbar, container, hamburger, homepageAnchor;

describe("homepage.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("./homepage/homepage.html");
    document = await dom.window.document;
    window = await dom.window;
    navbar = document.querySelector(".navbar");
    container = document.querySelector("#homepage-container");
    hamburger = document.querySelector(".icon");
    homepageAnchor = document.querySelector(".logo h1 a");
  });

  it("contains navbar", () => {
    expect(navbar).toBeTruthy;
  });

  it("contains a container", () => {
    expect(container).toBeTruthy;
  });

  it("adds the classlist, open, to the hamburger menu on click", () => {
    hamburger.click();
    expect(hamburger.classList).toContain("open");
  });

  it("removes the classlist, open, from the hamburger menu clicked again", () => {
    hamburger.click();
    hamburger.click();
    expect(hamburger.classList).not.toContain("open");
  });

  // it("takes you back to the homepage when you click the Unity logo", () => {
  //   homepageAnchor.click();
  //   expect(window.location.pathname).toBe(
  //     `${process.cwd()}/homepage/homepage.html`
  //   );
  // });
});
