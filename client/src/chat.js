import React, { Component } from "react";
class KommunicateChat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    (function(d, m) {
      var kommunicateSettings = {
        appId: "<YOUR APP_ID>",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
  render() {
    return (
      <div>
        {(function(d, m) {
          var kommunicateSettings = {
            appId: "28930a92e1206d3d7f60b50cf800362c1",
            popupWidget: true,
            automaticChatOpenOnNavigation: true,
          };
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
          var h = document.getElementsByTagName("head")[0];
          h.appendChild(s);
          window.kommunicate = m;
          m._globals = kommunicateSettings;
        })(document, window.kommunicate || {})}
      </div>
    );
  }
}
export default KommunicateChat;
