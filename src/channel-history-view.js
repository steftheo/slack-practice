import token from 'slack-token';

function findHistoryForChannel(channelName) {
  console.log(`Finding channel...`);
  const url = `
    https://slack.com/api/channels.history?
    token=${token}`;

  return fetch(url, { method: `POST` })
    .then(res => res.json())
    .then(json => {
      console.log(`json`, json);
    });
}


export default class messageHistoryView {
  constructor(el) {
    this.el = el;

    this.render();
  }

  listenForClick() {
    this.el.querySelector("button").addEventListener("click", () => {
      const message = this.el.querySelector(".post-history").value;
      const channel = this.el.querySelector(".post-channel").value;

      console.log(message, channel);

      history(channel, message)
      .then(() => {
        this.notification = `${channel}, ${message}`;
        this.render();
      })
      .catch((e) => {
        this.notification = `There was an error: ${e}`;
        this.render();
      });
    });
  }

  render() {
    this.el.innerHTML =
    `<p>${this.notification}</p>
    <input class='post-history' type='text' placeholder='Message'>
    <input class='post-channel' type='text' placeholder='Channel Name'>
    <button>Post</button>`;

    this.listenForClick();
  }
}

export default findHistoryForChannel;
