const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
});
const myVideo = createVideoElement(true);
const peers = {};

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(handleUserMedia);

socket.on('user-disconnected', handleUserDisconnected);

myPeer.on('open', initializePeerConnection);

function initializePeerConnection(id) {
  socket.emit('join-room', ROOM_ID, id);
}

function handleUserMedia(stream) {
  addVideoStream(myVideo, stream);
  myPeer.on('call', call => handleCall(call, stream));
  socket.on('user-connected', userId => connectToNewUser(userId, stream));
}

function handleCall(call, stream) {
  call.answer(stream);
  const video = createVideoElement();
  call.on('stream', userVideoStream => addVideoStream(video, userVideoStream));
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = createVideoElement();
  call.on('stream', userVideoStream => addVideoStream(video, userVideoStream));
  call.on('close', () => video.remove());
  peers[userId] = call;
}

function handleUserDisconnected(userId) {
  if (peers[userId]) peers[userId].close();
}

function createVideoElement(muted = false) {
  const video = document.createElement('video');
  video.muted = muted;
  return video;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => video.play());
  videoGrid.append(video);
}
