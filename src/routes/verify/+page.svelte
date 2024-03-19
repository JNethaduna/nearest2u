<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Identity</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f3f3f3;
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            padding: 40px 20px;
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
        }

        h1 {
            font-size: 36px;
            color: #ff4d4d;
            margin-bottom: 20px;
            font-weight: bold;
        }

        p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
        }

        .upload-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 40px;
            margin-top: 30px;
        }

        .upload-box {
            width: 250px;
            height: 250px;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #f9f9f9;
            border: 2px dashed #ccc;
        }

        .upload-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .upload-box input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .plus-icon {
            font-size: 60px;
            color: #999;
            transition: all 0.3s ease;
            margin-bottom: 10px;
        }

        .upload-box:hover .plus-icon {
            color: #666;
        }

        .upload-label {
            font-size: 18px;
            color: #666;
            transition: all 0.3s ease;
        }

        .upload-box:hover .upload-label {
            color: #333;
        }

        .error {
            color: red;
            margin-top: 20px;
        }

        .submit-button {
            width: 100%;
            padding: 15px;
            margin-top: 30px;
            border: none;
            border-radius: 5px;
            background-color: #ff4d4d;
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .submit-button:hover {
            background-color: #ff3333;
        }

        .image-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
        }

        .ss{
            color: #ff3333;
        }

        .success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 255, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            font-size: 24px;
            z-index: 9999;
            animation: slideIn 1s ease-in-out forwards;
        }

        @keyframes slideIn {
            0% { transform: translate(-50%, -100%); }
            100% { transform: translate(-50%, -50%); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Identity</h1>
        <p>Upload images of both sides of your identity card</p>
        <p class="ss">Screenshots should not be accepted</p>
        <div class="upload-container">
            <div class="upload-box">
                <input type="file" accept="image/*" id="front-image" onchange="handleImageUpload('front-image', 'front-preview')" />
                <label for="front-image">
                    <br>
                    <span class="plus-icon"><center>+</span>
                    <span class="upload-label">Click to upload front side</span>
                </label>
                <img id="front-preview" class="image-preview" />
            </div>
            <div class="upload-box">
                <input type="file" accept="image/*" id="back-image" onchange="handleImageUpload('back-image', 'back-preview')" />
                <label for="back-image">
                <br>
                    <span class="plus-icon"><center>+</span>
                    <span class="upload-label">Click to upload back side</span>
                    <br>
                </label>
                <img id="back-preview" class="image-preview" />
            </div>
        </div>
        <p class="error" id="error-message"></p>
        <button onclick="handleSubmit()" class="submit-button">Submit</button>
    </div>

    <script>
        const handleImageUpload = (inputId, previewId) => {
            const input = document.getElementById(inputId);
            const preview = document.getElementById(previewId);
            const errorMessage = document.getElementById('error-message');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.style.opacity = 1;
                }
                
                reader.readAsDataURL(input.files[0]);
            } else {
                errorMessage.textContent = "Failed to upload image.";
            }
        };

        const handleSubmit = () => {
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = ""; // Clear previous error messages

            const frontImage = document.getElementById('front-image');
            const backImage = document.getElementById('back-image');

            if (!frontImage.files[0] || !backImage.files[0]) {
                errorMessage.textContent = "Both sides of the card are required.";
                return;
            }

            // Handle form submission
            fetch('/verify', {
                method: 'POST',
                 body: JSON.stringify({ frontImage: frontImage.files[0], backImage: backImage.files[0] }),
                headers: {
                    'Content-Type': 'application/json'
                 }
             })
             .then(response => response.json())
            .then(data => {
                // Display success message creatively
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = "Image Upload Successful";
                document.body.appendChild(successMessage);

                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);

                console.log(data);
            })
             .catch(error => console.error('Error:', error));
        };
    </script>
</body>
</html>
