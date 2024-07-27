// This object is provided as `config.rtcConfig` to Trystero's `joinRoom`
// function: https://github.com/dmotz/trystero#joinroomconfig-namespace
//
// https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#parameters
export const rtcConfig: RTCConfiguration = {
  // These are the relay servers that are used in case a direct peer-to-peer
  // connection cannot be made. Feel free to change them as you'd like. If you
  // would like to disable relay servers entirely, remove the `iceServers`
  // property from the rtcConfig object. IF YOU DISABLE RELAY SERVERS,
  // CHITCHATTER PEERS MAY NOT BE ABLE TO CONNECT DEPENDING ON HOW THEY ARE
  // CONNECTED TO THE INTERNET.
  iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "6b437e2ac1a4f0830a5e9330",
        credential: "hIUqH0S18YV1W4jX",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "6b437e2ac1a4f0830a5e9330",
        credential: "hIUqH0S18YV1W4jX",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "6b437e2ac1a4f0830a5e9330",
        credential: "hIUqH0S18YV1W4jX",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "6b437e2ac1a4f0830a5e9330",
        credential: "hIUqH0S18YV1W4jX",
      },
  ],
}
