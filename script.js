document.addEventListener("DOMContentLoaded", () => {
  const daysTag = document.querySelector(".days"),
        currentDate = document.querySelector(".current-date"),
        prevGif = document.getElementById("prevGif"),
        nextGif = document.getElementById("nextGif");

  let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  
  // วันที่สำคัญ + ไอคอน + tooltip
  const specialEvents = [
  {
    date: "2026-01-07",
    label: "วันเกิดพี่ฟิล์ม",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-01-10",
    label: "วันเกิดพี่หุ้ย",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-07-08",
    label: "วันเกิดจูจู",
    icon: "assets/BDay.png"
  },
  {
    date: "2026-07-17",
    label: "วันเกิดพี่แอร์",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-08-20",
    label: "วันเกิดพี่บิ๋ม",
    icon: "assets/BDay.png"
  }, 
  {
    date: "2026-08-16",
    label: "วันเกิดพี่ลิลลี่",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-09-26",
    label: "วันเกิดพี่เหมย",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-09-27",
    label: "วันเกิดพี่เหว่ย",
    icon: "assets/BDay.png"
  },   
  {
    date: "2026-10-20",
    label: "วันเกิดฟ้า",
    icon: "assets/BDay.png"
  },  
  {
    date: "2026-11-28",
    label: "วันเกิดพี่เปิ้ล",
    icon: "assets/BDay.png"
  },  
  {
    date: "2025-12-25",
    label: "วันคริสมาสต์",
    icon: "assets/xmas-hat.png"
  },
  {
    date: "2025-12-31",
    label: "วันสิ้นปี",
    icon: "assets/lastyear.png"
  },   
  {
    date: "2026-01-01",
    label: "วันขึ้นปีใหม่",
    icon: "assets/party-hat.png"
  },
  {
    date: "2026-03-03",
    label: "วันมาฆบูชา",
    icon: "assets/Maghapuja.png"
  },
  {
    date: "2026-04-06",
    label: "วันจักรี",
    icon: "assets/Chakri.png"
  },
  {
    date: "2026-04-13",
    label: "วันสงกรานต์",
    icon: "assets/Songkran.png"
  },
  {
    date: "2026-04-13",
    label: "วันสงกรานต์",
    icon: "assets/Songkran.png"
  },
  {
    date: "2026-04-14",
    label: "วันสงกรานต์",
    icon: "assets/Songkran.png"
  },
  {
    date: "2026-04-15",
    label: "วันสงกรานต์",
    icon: "assets/Songkran.png"
  },
  {
    date: "2026-05-01",
    label: "วันแรงงาน",
    icon: "assets/แรงงาน.png"
  },
  {
    date: "2026-06-03",
    label: "วันเกิดราชินี",
    icon: "assets/วันเกิดราชินี.png"
  },
  {
    date: "2026-07-28",
    label: "วันเกิดเสี่ยโอ",
    icon: "assets/วันเกิดเสี่ยโอ.png"
  },
  {
    date: "2026-07-29",
    label: "วันอาสาฬหบูชา",
    icon: "assets/อาสาฬหบูชา.png"
  },
  {
    date: "2026-04-15",
    label: "วันแม่แห่งชาติ",
    icon: "assets/วันแม่.png"
  },
  {
    date: "2026-10-13",
    label: "วันสวรรคตร.9",
    icon: "assets/วันเสียร.9.png"
  },
  {
    date: "2026-10-23",
    label: "วันปิยมหาราช",
    icon: "assets/ปิยมหาราช.png"
  },
  {
    date: "2026-12-07",
    label: "ชดเชยวันพ่อ",
    icon: "assets/ชดเชยวันพ่อ.png"
  },
  {
    date: "2026-12-31",
    label: "วันสิ้นปี",
    icon: "assets/lastyear2.png"
  },
  {
    date: "2026-12-03",
    label: "BTS's Concert",
    icon: "assets/BTS.png"
  },
  {
    date: "2026-12-05",
    label: "BTS's Concert",
    icon: "assets/BTS.png"
  },
  {
    date: "2026-12-06",
    label: "BTS's Concert",
    icon: "assets/BTS.png"
  }
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    let liTag = "";

    // วันก่อนหน้า
    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // วันเดือนนี้
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = 
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear() ? "active" : "";
      
      // สร้างวันที่ในรูปแบบ YYYY-MM-DD เพื่อใช้เช็ค special event
      let thisDate = `${currYear}-${String(currMonth + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
      let event = specialEvents.find(e => e.date === thisDate);

      let iconHTML = event ? `<img src="${event.icon}" class="event-icon" alt="">` : "";
      let tooltip = event ? `title="${event.label}"` : "";

      liTag += `<li class="${isToday}" ${tooltip}>${i}${iconHTML}</li>`;  
    }

    // วันเดือนถัดไป เพื่อครบ 42 ช่อง
    let totalDays = liTag.match(/<li/g).length;
    for (let i = totalDays + 1; i <= 42; i++) {
      liTag += `<li class="inactive"></li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
  };

  renderCalendar();

  // ฟังก์ชันเปลี่ยนเดือน
  const changeMonth = (direction) => {
    if (direction === "prev") {
      currMonth--;
      if (currMonth < 0) {
        currMonth = 11;
        currYear--;
      }
    } else if (direction === "next") {
      currMonth++;
      if (currMonth > 11) {
        currMonth = 0;
        currYear++;
      }
    }
    renderCalendar();
  };

  // คลิก GIF ซ้าย/ขวา
  prevGif.addEventListener("click", () => changeMonth("prev"));
  nextGif.addEventListener("click", () => changeMonth("next"));
});
