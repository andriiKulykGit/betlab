/* const tabs = document.querySelector(".match_table_btns");
const tabButton = document.querySelectorAll(".match_table_btn");
const contents = document.querySelectorAll(".tab_content");

if (tabs) {
	tabs.onclick = (e) => {
		let target = e.target;
		while (target && !target.classList.contains("match_table_btn")) {
			target = target.parentNode;
		}
		if (target && target.dataset.id) {
			const id = target.dataset.id;
			tabButton.forEach((btn) => {
				btn.classList.remove("match_table_btn_active");
			});
			target.classList.add("match_table_btn_active");

			contents.forEach((content) => {
				content.classList.remove("active_content");
			});
			const element = document.getElementById(id);
			element.classList.add("active_content");

			if (element == "content2") initSlider().update();
		}
	};
} */

const tabs = document.querySelectorAll("[data-tab-target]");
const contents = document.querySelectorAll("[data-tab-id]");
const tabActiveClass = "match_table_btn_active";
const contentActiveClass = "active_content";

function activateTab(targetID) {
	tabs.forEach((tab) => {
		tab.classList.toggle(
			tabActiveClass,
			tab.dataset.tabTarget === targetID,
		);
	});

	contents.forEach((content) => {
		content.classList.toggle(
			contentActiveClass,
			content.dataset.tabId === targetID,
		);
	});

	if (targetID === "content2") initSlider().update();
}

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		activateTab(tab.dataset.tabTarget);
	});
});

function initSlider() {
	const slider = new Swiper(".table__slider", {
		slidesPerView: 1,
		spaceBetween: 12,
		loop: false,
		pagination: {
			el: ".table__slider-pagination",
			type: "progressbar",
		},
		on: {
			reachEnd: function () {
				slider.pagination.el.classList.add("_active");
			},
			fromEdge: function () {
				slider.pagination.el.classList.remove("_active");
			},
		},
		grabCursor: true,
		watchSlidesProgress: true,
		breakpoints: {
			480: { slidesPerView: 1.5 },
			580: { slidesPerView: 2 },
			655: { slidesPerView: 2.5 },
			800: { slidesPerView: 3 },
			900: { slidesPerView: 3.5 },
			1000: { slidesPerView: 4 },
			1100: { slidesPerView: 4.5 },
			1200: { slidesPerView: 5 },
			1300: { slidesPerView: 5.5 },
			1386: { slidesPerView: 6 },
		},
	});

	const btns = document.querySelectorAll(".tables_filters_list_btn");

	btns.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			updateActiveButton(btns, btn);
			slider.slideTo(index);
			updateActiveSlide(slider, index);
		});
	});

	slider.on("slideChange", () => {
		updateActiveButton(btns, btns[slider.activeIndex]);
		updateActiveSlide(slider, slider.activeIndex);
	});

	return slider;
}

function updateActiveButton(btns, activeBtn) {
	btns.forEach((btn) =>
		btn.classList.remove("tables_filters_list_btn_active"),
	);
	activeBtn.classList.add("tables_filters_list_btn_active");
}

function updateActiveSlide(slider, activeIndex) {
	slider.slides.forEach((slide) =>
		slide.classList.remove("table_list_item_active"),
	);
	slider.slides[activeIndex].classList.add("table_list_item_active");
}
