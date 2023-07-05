const listStudentLocal = JSON.parse(localStorage.getItem("listStudents")) || [];

const listStudents = [
  {
    id: 1,
    name: "John",
    email: "john99@gmail.com",
    phone: "0902029029",
    address: "New York",
    gender: "Nam",
  },
  {
    id: 2,
    name: "Donald",
    email: "donald22@gmail.com",
    phone: "0902029029",
    address: "Mahatan",
    gender: "Nam",
  },
  {
    id: 3,
    name: "Taylor",
    email: "daniel5@gmail.com",
    phone: "0902029029",
    address: " Seattle",
    gender: "Nữ",
  },
];
localStorage.setItem("listStudents", JSON.stringify(listStudents));
render(listStudentLocal);
function render(data) {
  const tbody = document.querySelector("tbody");
  let content = "";
  data.forEach((staff, index) => {
    content += `  <tr>
    <td>${index + 1}</td>
    <td>${staff.name}</td>
    <td>${staff.email}</td>
    <td>${staff.phone}</td>
    <td>${staff.address}</td>
    <td>${staff.gender}</td>
    <td class="icon">
      <i onclick="editStaff(${staff.id})"class="bx bxs-edit-alt"> Sửa</i>
      <i onclick="deleteStaff(${staff.id})"class="bx bx-x"> Xóa</i>
    </td>
  </tr>`;
  });
  tbody.innerHTML = content;
}

//add
const add = document.querySelector("#btn-add");
add.addEventListener("click", () => {
  const namevalue = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;
  getGender();
  const gender = selectedGender;
  const newStaff = {
    id: listStudentLocal.length + 1,
    name: namevalue,
    email: email,
    phone: phone,
    address: address,
    gender: gender,
  };

  const check = validate(newStaff);
  console.log(check);
  if (check) {
    renderError(check);
  }
  listStudentLocal.push(newStaff);
  localStorage.setItem("listStudents", JSON.stringify(listStudents));
  render(listStudentLocal);
});
//validate
function validate(newStaff) {
  let error = {
    isError: false,
    nameMSG: "",
    emailMSG: "",
    phoneMSG: "",
    addressMSG: "",
  };
  for (let i = 0; i < listStudentLocal.length; i++) {
    if (newStaff.email == listStudentLocal[i].email) {
      error.emailMSG = "Email đã tồn tại";
      error.isError = true;
    }
  }

  const regxEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!newStaff.email.match(regxEmail)) {
    error.emailMSG = "Email không đúng định dạng. Vui lòng nhập lại!!!";
    error.isError = true;
  }
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!newStaff.phone.match(regexPhoneNumber)) {
    error.phoneMSG = "Vui lòng nhập đúng định dạng số điện thoại";
    error.isError = true;
  }

  if (newStaff.address == "") {
    error.addressMSG = "Không được để trống địa chỉ";
    error.isError = true;
  }
  if (newStaff.name == "") {
    error.nameMSG = "Không được để trống địa chỉ";
    error.isError = true;
  }

  return error;
}
function renderError(error) {
  const name = document.getElementById("nameMSG");
  const email = document.getElementById("emailMSG");
  const phone = document.getElementById("phoneMSG");
  const address = document.getElementById("addresslMSG");

  name.innerHTML = error.nameMSG;
  phone.innerHTML = error.phoneMSG;
  email.innerHTML = error.emailMSG;
  address.innerHTML = error.addressMSG;
}

//show form
const showForm = document.querySelector("#showForm");
const form = document.querySelector(".form-add");
$(showForm).click(function () {
  $(form).toggle(1000);
});
//radio___lấy giới tính
var selectedGender;
function getGender() {
  var genderRadios = document.getElementsByName("gender");
  // Lặp qua tất cả các nút radio
  genderRadios.forEach(function (radio) {
    // Thêm sự kiện 'click' cho mỗi nút radio
    radio.addEventListener("click", () => {
      // Kiểm tra xem nút radio được chọn là nút nào
      if (radio.checked) {
        // Lấy giá trị của nút radio được chọn
        selectedGender = radio.value;
        // Sử dụng giá trị của nút radio ở đây, ví dụ: in ra console
      }
    });
  });
}
getGender();
//edit
function editStaff(id) {
  //ẩn hiện form cập nhật
  const form = document.querySelector(".form-update");
  $(form).toggle(1000);
  //___

  const name = document.querySelector("#name-update");
  const email = document.querySelector("#email-update");
  const phone = document.querySelector("#phone-update");
  const address = document.querySelector("#address-update");
  const oldStaff = listStudentLocal.find((staff, index) => {
    if (id == staff.id) {
      return staff;
    }
  });
  name.value = oldStaff.name;
  email.value = oldStaff.email;
  phone.value = oldStaff.phone;
  address.value = oldStaff.address;

  const btnUpdate = document.getElementById("btn-update");
  btnUpdate.setAttribute("onclick", `update('${id}')`);
}
function update(id) {
  console.log(id);
  const name = document.querySelector("#name-update").value;
  const email = document.querySelector("#email-update").value;
  const phone = document.querySelector("#phone-update").value;
  const address = document.querySelector("#address-update").value;
  const gender = selectedGender;
  console.log(gender, "up");
  const oldStaff = listStudentLocal.find((staff, index) => {
    if (id == staff.id) {
      return staff;
    }
  });
  oldStaff.name = name;
  oldStaff.email = email;
  oldStaff.phone = phone;
  oldStaff.address = address;
  oldStaff.gender = gender;
  render(listStudentLocal);
}
function deleteStaff(id) {
  listStudentLocal.forEach((staff, index) => {
    if (staff.id == id) {
      listStudentLocal.splice(index, 1);
      render(listStudentLocal);
    }
  });
}
function search() {
  const valueSearch = document.getElementById("search");
  if (valueSearch.value == "") {
    render(listStudentLocal);
  } else {
    let searchStudent = listStudentLocal.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(
          valueSearch.value.toLowerCase() || valueSearch.value == item.id
        );
    });
    render(searchStudent);
  }
}
