import httpRequest from "./utils/httpRequest.js";
import authentication from "./services/authentication.js";
import toast from "./services/toastMessage.min.js";

// Auth Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const signupBtn = document.querySelector(".signup-btn");
  const loginBtn = document.querySelector(".login-btn");
  const authModal = document.getElementById("authModal");
  const modalClose = document.getElementById("modalClose");
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const showLoginBtn = document.getElementById("showLogin");
  const showSignupBtn = document.getElementById("showSignup");
  // Function to show signup form
  function showSignupForm() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  }
  // Function to show login form
  function showLoginForm() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }

  // Function to open modal
  function openModal() {
    authModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  // Open modal with Sign Up form when clicking Sign Up button
  signupBtn.addEventListener("click", function () {
    showSignupForm();
    openModal();
  });

  // Open modal with Login form when clicking Login button
  loginBtn.addEventListener("click", function () {
    showLoginForm();
    openModal();
  });

  // Close modal function
  function closeModal() {
    authModal.classList.remove("show");
    document.body.style.overflow = "auto"; // Restore scrolling
  }

  // Close modal when clicking close button
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking overlay (outside modal container)
  authModal.addEventListener("click", function (e) {
    if (e.target === authModal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && authModal.classList.contains("show")) {
      closeModal();
    }
  });

  // Switch to Login form
  showLoginBtn.addEventListener("click", function () {
    showLoginForm();
  });

  // Switch to Signup form
  showSignupBtn.addEventListener("click", function () {
    showSignupForm();
  });
});

// User Menu Dropdown Functionality
document.addEventListener("DOMContentLoaded", function () {
  const userAvatar = document.getElementById("userAvatar");
  const userDropdown = document.getElementById("userDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  // Toggle dropdown when clicking avatar
  userAvatar.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.remove("show");
    }
  });

  // Close dropdown when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && userDropdown.classList.contains("show")) {
      userDropdown.classList.remove("show");
    }
  });

  // Handle logout button click
  logoutBtn.addEventListener("click", function () {
    // Close dropdown first
    userDropdown.classList.remove("show");

    // TODO: Students will implement logout logic here
  });
});

// Other functionality
document.addEventListener("DOMContentLoaded", function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  class ValidateInput {
    email(value) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    }
    password(value) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      return regex.test(value);
    }
    displayName(value) {
      return value.length > 4;
    }
    userName(value) {
      return value.length > 4;
    }
    login(input) {
      let isValidate = false;
      const formGroup = input.closest(".form-group");
      if (input.getAttribute("type") === "email") {
        if (this.email(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        } else {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Vui lòng nhập đúng trường email !";
          isValidate = false;
        }
      } else if (input.getAttribute("type") === "password") {
        if (input.value.length < 6) {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Mật khẩu phải nhiều hơn 6 kí tự";
          isValidate = false;
        } else if (this.password(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        } else {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số";
          isValidate = false;
        }
      }
      return isValidate;
    }
    register(input) {
      let isValidate = false;
      const formGroup = input.closest(".form-group");
      if (input.getAttribute("type") === "email") {
        if (this.email(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        } else {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Vui lòng nhập đúng trường email !";
          isValidate = false;
        }
      } else if (input.getAttribute("type") === "password") {
        if (input.value.length < 6) {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Mật khẩu phải nhiều hơn 6 kí tự";
          isValidate = false;
        } else if (this.password(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        } else {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số";
          isValidate = false;
        }
      } else if (input.getAttribute("id") === "signupUserName") {
        if (input.value.length < 4) {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Tên đang nhập phải nhiều hơn 4 kí tự";
          isValidate = false;
        } else if (this.userName(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        }
      } else if (input.getAttribute("id") === "signupDisplayName") {
        if (input.value.length < 4) {
          formGroup.classList.remove("success");
          formGroup.classList.add("invalid");
          formGroup.querySelector("span").textContent =
            "Tên hiển thị phải nhiều hơn 4 kí tự";
          isValidate = false;
        } else if (this.displayName(input.value)) {
          formGroup.classList.add("success");
          formGroup.classList.remove("invalid");
          isValidate = true;
        }
      }
      return isValidate;
    }
  }
  class ActionAuthentication {
    hiddenModal(inputs = []) {
      inputs.forEach((input) => {
        input.value = null;
      });
      $(".modal-overlay").classList.remove("show");
    }
    toastError(errorsResponse) {
      if (errorsResponse.error?.code === "VALIDATION_ERROR") {
        errorsResponse.error.details.forEach((error) => {
          toast({
            title: "Error!",
            message: `${error.message}`,
            type: "error",
            duration: 2000,
          });
        });
      } else {
        toast({
          title: "Error!",
          message: `${errorsResponse.error.message}`,
          type: "error",
          duration: 2000,
        });
      }
    }
  }
  const validateInput = new ValidateInput();
  const actionAuthentication = new ActionAuthentication();
  //REGISTER
  $("#signupForm .auth-form-content").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    let isValidate = false;
    inputs.forEach((input) => {
      validateInput.register(input);
      input.addEventListener("input", (e) => {
        validateInput.register(input);
      });
      isValidate = validateInput.register(input);
    });
    // Xử lý khi submit
    if (isValidate) {
      const password = e.target.querySelector("#signupPassword").value;
      const email = e.target.querySelector("#signupEmail").value;
      const username = e.target.querySelector("#signupUserName").value;
      const display_name = e.target.querySelector("#signupDisplayName").value;
      // await
      const response = await authentication.register({
        email,
        password,
        display_name,
        username,
      });
      if (response.ok) {
        renderDataUser();
        toast({
          title: "Success !",
          message: "Register success.",
          type: "success",
          duration: 2000,
        });
        actionAuthentication.hiddenModal(inputs);
      } else {
        const errors = await response.json();
        actionAuthentication.toastError(errors);
      }
    }
  });
  //LOGIN
  $("#loginForm .auth-form-content").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    let isValidate = false;
    inputs.forEach((input) => {
      validateInput.login(input);
      input.addEventListener("input", (e) => {
        validateInput.login(input);
      });
      isValidate = validateInput.login(input);
    });
    // Xử lý khi submit
    if (isValidate) {
      const emailValue = e.target.querySelector('input[type="email"]').value;
      const passwordValue = e.target.querySelector(
        'input[type="password"]'
      ).value;
      const response = await authentication.login({
        email: emailValue,
        password: passwordValue,
      });
      if (response.ok) {
        renderDataUser();
        toast({
          title: "Success !",
          message: "Login success.",
          type: "success",
          duration: 2000,
        });
        actionAuthentication.hiddenModal(inputs);
      } else {
        const errors = await response.json();
        actionAuthentication.toastError(errors);
      }
    }
  });
  async function renderDataUser() {
    let infoUser = false;
    if (localStorage.getItem("access_token")) {
      infoUser = await authentication.getInfo();
    }
    if (infoUser) {
      $(".auth-buttons").style = "display:none";
      $(".user-menu").style = "display:flex";
    } else {
      $(".user-menu").style = "display:none";
      $(".auth-buttons").style = "display:flex";
    }
  }
  renderDataUser();
});
