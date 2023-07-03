import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
    this.data = [{ name: "Harry" }, { name: "Alex" }];
    this.template = `
    <div id="homepage-container">
        <div id="homepage-left">
            <h1 class="homepage-title">The most skilled and trusted volunteers</h1>
            <p class="homepage-text">Get instant access to a curated pool of dedicated volunteers, seeking to serve the council. Find individuals passionate about community service, willing to contribute their skills and expertise in various areas. Discover volunteers in roles such as Gardeners, Librarians, Shoppers and more...</p>
            <div class="homepage-buttons">
                <button>Looking for a volunteer?</button>
                <button>You want to volunteer?</button>
            </div>
                <div class="homepage-snippet">
                    <p>"Volunteering as a gardener for the council through Unity was an incredibly rewarding experience. I was able to contribute my passion for gardening while making a positive impact in the community, and the platform made it effortless to connect with the council and find this volunteering opportunity</p>
                    <h1>Big Dave</h1>
            </div>
        </div>
        <div id="homepage-right">
            <div id="info-container">
            </div>
        </div>
    </div> `;
  }

  async getHtml() {
    return this.template;
  }
}

//<h1>${this.data.map((d) => `<p>${d.name}</p>`).join("")}</h1>
