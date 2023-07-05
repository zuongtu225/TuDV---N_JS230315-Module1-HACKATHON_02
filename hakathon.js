const bai1 = document.getElementById("bai1");
bai1.addEventListener("click", () => {
  const print = document.getElementById("result");
  const string = document.getElementById("checkvalue").value;
  let first = 0;
  let last = string.length - 1;

  if (string.length >= 2) {
    while (last > first) {
      if (string[first] !== string[last]) {
        print.style.color = "red";
        print.innerHTML = "Đây không phải là chuỗi đối xứng";
        return false;
      } else {
        print.style.color = "green";
        print.innerHTML = "Đây  là chuỗi đối xứng";
      }
      first++;
      last--;
    }
  } else {
    print.innerHTML = "Vui lòng nhập hơn 2 ký tự";
  }
});
const bai2 = document.getElementById("bai2");
bai2.addEventListener("click", () => {
  let print2 = document.querySelector("#result2");
  let string = document.getElementById("checkvalue2").value;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let isDulicate = false;
  for (let k = 0; k < string.length; k++) {
    for (let i = 0; i < upper.length; i++) {
      if (string[k] === upper[i]) {
        result += string[k].toLowerCase();
        isDulicate = true;
        break; //DỪNG LẶP CÁC CHỮ CÒN LẠI
      }
      if (!isDulicate) {
        result += string[k].toUpperCase();
        break;
      }
    }
    print2.innerHTML = result;
  }
});
//____Bài 5___app quản lý nhân viên_____
const listStaff = [
  {
    id: 1,
    name: "John",
    age: 26,
    address: "6 Pasteur Đà Nẵng",
    position: "Nhân viên",
  },
  {
    id: 2,
    name: "Daniel",
    age: 27,
    address: "7 Pasteur Đà Nẵng",
    position: "Nhân viên",
  },
  {
    id: 3,
    name: "Andrew",
    age: 28,
    address: "8 Pasteur Đà Nẵng",
    position: "Nhân viên",
  },
];
render(listStaff);
function render(data) {
  const tbody = document.querySelector("tbody");
  let content = "";
  data.forEach((staff, index) => {
    content += `  <tr>
    <td>${index + 1}</td>
    <td>${staff.name}</td>
    <td>${staff.age}</td>
    <td>${staff.address}</td>
    <td>${staff.position}</td>
    <td class="icon">
      <i onclick="editStaff(${staff.id})" class="bx bxs-edit-alt"></i>
      <i onclick="deleteStaff(${staff.id})" class="bx bx-x"></i>
    </td>
  </tr>`;
  });
  tbody.innerHTML = content;
}

//show form
const showForm = document.querySelector("#showForm");
const form = document.querySelector(".form-add");
$(showForm).click(function () {
  $(form).toggle(1000);
});
//add staff
const add = document.querySelector("#btn-add");
add.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const age = document.querySelector("#age");
  const address = document.querySelector("#address");
  const position = document.querySelector("#position");
  const newStaff = {
    id: listStaff.length + 1,
    name: name.value,
    age: age.value,
    address: address.value,
    position: position.value,
  };
  listStaff.push(newStaff);
  render(listStaff);
});

//edit
function editStaff(id) {
  //ẩn hiện form cập nhật
  const form = document.querySelector(".form-update");
  $(form).toggle(1000);
  //___
  const name = document.querySelector("#name-update");
  const age = document.querySelector("#age-update");
  const address = document.querySelector("#address-update");
  const position = document.querySelector("#position-update");
  const oldStaff = listStaff.find((staff, index) => {
    if (id == staff.id) {
      return staff;
    }
  });
  name.value = oldStaff.name;
  age.value = oldStaff.age;
  address.value = oldStaff.address;
  position.value = oldStaff.position;
  const btnUpdate = document.getElementById("btn-update");
  btnUpdate.setAttribute("onclick", `update('${id}')`);
}
function update(id) {
  const name = document.querySelector("#name-update").value;
  const age = document.querySelector("#age-update").value;
  const address = document.querySelector("#address-update").value;
  const position = document.querySelector("#position-update").value;

  const oldStaff = listStaff.find((staff, index) => {
    if (id == staff.id) {
      return staff;
    }
  });
  oldStaff.name = name;
  oldStaff.age = age;
  oldStaff.address = address;
  oldStaff.position = position;
  render(listStaff);
}

function deleteStaff(id) {
  console.log(id);
  //   const oldStaff = listStaff.find((staff, index) => {
  //     if (id == staff.id) {
  //       return staff;
  //     }
  //   });
  listStaff.forEach((staff, index) => {
    if (staff.id == id) {
      listStaff.splice(index, 1);
      render(listStaff);
    }
  });
}
