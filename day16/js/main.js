const canvas = new fabric.Canvas("canvas", {
  width: 800,
  height: 600,
});

// Random colors for background
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E74C3C",
  "#2ECC71",
];

// Initialize panels
function initPanels() {
  // Setup color panel
  const colorGrid = document.querySelector(".color-grid");
  colors.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    colorBox.onclick = () =>
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    colorGrid.appendChild(colorBox);
  });

  // Setup text panel handlers
  document.querySelectorAll("#text-panel button").forEach((btn) => {
    btn.onclick = () => {
      const type = btn.dataset.text;
      const text = new fabric.Text(
        type === "h1" ? "Heading 1" : type === "h6" ? "Heading 6" : "Paragraph",
        {
          left: canvas.width / 2,
          top: canvas.height / 2,
          fontSize: type === "h1" ? 32 : type === "h6" ? 16 : 20,
          originX: "center",
          originY: "center",
        }
      );
      canvas.add(text);
    };
  });

  // Load images from Picsum
  loadImages();
}

// Load images from Picsum API
async function loadImages() {
  try {
    const response = await fetch("https://picsum.photos/v2/list?limit=10");
    const images = await response.json();
    const imageGrid = document.querySelector(".image-grid");

    images.forEach((img) => {
      const imgElement = document.createElement("img");
      imgElement.src = `https://picsum.photos/id/${img.id}/200/200`;
      imgElement.onclick = () => addImageToCanvas(img.download_url);
      imageGrid.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

// Add image to canvas
function addImageToCanvas(url) {
  fabric.Image.fromURL(
    url,
    (img) => {
      img.scaleToWidth(200);
      canvas.add(img);
      canvas.renderAll();
    },
    { crossOrigin: "anonymous" }
  );
}

// Menu handling
document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.onclick = () => {
    const panelId = btn.dataset.panel + "-panel";
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.classList.remove("active");
    });
    document.getElementById(panelId).classList.add("active");
  };
});

// Download functionality
document.getElementById("download").addEventListener("click", function () {
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
  });

  // Create temporary link
  const link = document.createElement("a");
  const timestamp = new Date().getTime();
  link.download = `canvas-${timestamp}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Font size handling
document.getElementById("font-size").onchange = (e) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === "text") {
    activeObject.set("fontSize", parseInt(e.target.value));
    canvas.renderAll();
  }
};

// Delete object on Delete key
document.addEventListener("keyup", (e) => {
  if (e.key === "Delete") {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  }
});

// Initialize everything
initPanels();
