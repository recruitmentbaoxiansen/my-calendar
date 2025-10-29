const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".month-nav span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  
  let liTag = "";

  // วันก่อนหน้าของเดือนนี้
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  // วันของเดือนนี้
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                 && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  // วันของเดือนถัดไป เพื่อให้ครบ 6 แถว (42 วัน)
  let totalDays = liTag.match(/<li/g).length;
  for (let i = totalDays + 1; i <= 42; i++) {
    liTag += `<li class="inactive"></li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventList
