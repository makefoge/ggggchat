var webrtc={
	count:0,
	interval:false,
	ips:false,
	init:function(){
		//navigator.mediaDevices.getUserMedia({ video: true });
		var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		if(myPeerConnection)
		{
			var pc = new myPeerConnection({iceServers: [{urls: "stun:stun.l.google.com:19302"}]}),
				noop = function() {},
				localIPs = {},
				ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
				key;
			function ipIterate(ip) {
				localIPs[ip] = true;
				webrtc.ips=localIPs;
			}
			pc.createDataChannel("");
			pc.createOffer(function(sdp) {
				sdp.sdp.split('\n').forEach(function(line) {
					if (line.indexOf('candidate') < 0) return;
					line.match(ipRegex).forEach(ipIterate);
				});
				pc.setLocalDescription(sdp, noop, noop);
				return true;
			}, noop);
			pc.onicecandidate = function(ice) {
				if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
				ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
			};
		}
	}
};