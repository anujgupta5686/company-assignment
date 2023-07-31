function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
      var preview = document.getElementById('preview');
      preview.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  
function detectCorrosion() {
    let input = document.getElementById('image');
    let img = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function() {
        let imgData = reader.result;
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let image = new Image();
        image.src = imgData;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let corrosionPixels = 0;
            let totalPixels = data.length / 4;
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                let brightness = (3 * r + 4 * g + b) >>> 3;
                if (brightness < 150) {
                    corrosionPixels++;
                }
            }
            let corrosionPercentage = corrosionPixels / totalPixels * 100;
            let result = document.getElementById('result');
            if (corrosionPercentage > 0.1) {
                result.innerHTML = "Corrosion detected: " + corrosionPercentage.toFixed(2) + "%";
            } else {
                result.innerHTML = "No corrosion detected.";
            }
        }
    }
}