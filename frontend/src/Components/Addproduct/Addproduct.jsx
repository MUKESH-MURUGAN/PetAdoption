import React, { useState } from 'react';
// import './AddProduct.css'; // Ensure the file is in the same directory
import up from './Assets/up.png'; // Ensure the image file exists in Assets folder

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    image: null,
    category: "",
    age: "",
    address: "",
    state: "",
    PhoneNumber: "",
    Email: "",
    District: "",
  });

  const [isLoading, setIsLoading] = useState(false); // For button state

  const changeHandler = (e) => {
    if (e.target.name === "image") {
      setProductDetails({ ...productDetails, image: e.target.files[0] });
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.image || !productDetails.category) {
      alert("Please fill all required fields.");
      return;
    }

    setIsLoading(true); // Disable button while processing
    let responseData;
    let formData = new FormData();

    formData.append('image', productDetails.image);
    formData.append('id', productDetails.id);
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('age', productDetails.age);
    formData.append('address', productDetails.address);
    formData.append('state', productDetails.state);
    formData.append('PhoneNumber', productDetails.PhoneNumber);
    formData.append('Email', productDetails.Email);
    formData.append('District', productDetails.District);

    try {
      const uploadResponse = await fetch('https://petadoption-dinr.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });
      responseData = await uploadResponse.json();

      if (responseData.success) {
        const product = { ...productDetails, image: responseData.image_url };

        const productResponse = await fetch('https://petadoption-dinr.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const result = await productResponse.json();
        if (result.success) {
          alert("Product added successfully");
        } else {
          alert("Failed to add product");
        }
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the product.");
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div>
      <center>
        <h1>Pet Adoption</h1>
        <h3>Add Your Pet</h3>
      </center>
      <div className="addproduct">
        <div className="addproduct-items">
          <div className="addproduct-field">
            <p>Pet ID</p>
            <input
              value={productDetails.id}
              onChange={changeHandler}
              type="text"
              name="id"
              placeholder="Enter ID"
            />
          </div>

          <div className="addproduct-field">
            <p>Pet Name</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type="text"
              name="name"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="addproduct-field">
            <p>Age</p>
            <input
              value={productDetails.age}
              onChange={changeHandler}
              type="text"
              name="age"
              placeholder="Enter Age"
            />
          </div>

          <div className="addproduct-field">
            <p>Address</p>
            <input
              value={productDetails.address}
              onChange={changeHandler}
              type="text"
              name="address"
              placeholder="Enter Address"
            />
          </div>

          <div className="addproduct-field addproduct-category">
            <p>State</p>
            <select
              value={productDetails.state}
              onChange={changeHandler}
              name="state"
              className="selector"
            >
              <option value="">Select State</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerala">Kerala</option>
              {/* Add other states as needed */}
            </select>
          </div>

          <div className="addproduct-field addproduct-category">
            <p>Category</p>
            <select
              value={productDetails.category}
              onChange={changeHandler}
              name="category"
              className="selector"
            >
              <option value="">Select Category</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="fish">Fish</option>
              <option value="bird">Bird</option>
            </select>
          </div>

          <div className="addproduct-field">
            <p>Phone Number</p>
            <input
              value={productDetails.PhoneNumber}
              onChange={changeHandler}
              type="number"
              required
              name="PhoneNumber"
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="addproduct-field">
            <p>Email</p>
            <input
              value={productDetails.Email}
              onChange={changeHandler}
              type="email"
              name="Email"
              placeholder="Enter Email"
            />
          </div>

          <div className="addproduct-field">
            <p>District</p>
            <input
              value={productDetails.District}
              onChange={changeHandler}
              type="text"
              name="District"
              placeholder="Enter District"
            />
          </div>

          <div className="addproduct-field">
            <label htmlFor="file-input">
              <p>Upload Pet Image</p>
              <img src={up} className="imaged" alt="upload" />
            </label>
            <input
              onChange={changeHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>

          <div className="down">
            <button
              onClick={Add_Product}
              className="addproduct-button"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
