function uploadImage() {
    const fileInput = document.getElementById('file-upload');
    const preview = document.getElementById('image-preview');
  
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        preview.innerHTML = ''; 
        preview.appendChild(img); 
      }
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
  