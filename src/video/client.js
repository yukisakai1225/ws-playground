const sock = new WebSocket("ws://localhost:8000");

// const updateImage = (data) => {
//   console.log(data);
//   const image = document.getElementById("cameraCapture");
//   $("#cameraCapture").attr("src", data);
// };

const setupSocket = () => {
  sock.addEventListener("open", function (e) {
    console.log("接続しました");
  });

  sock.addEventListener("message", function (e) {
    console.log(e.data);
  });
};

setupSocket();
