const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});



let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        
        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }
        
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

// after refactoring
function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}


// // before refactoring
// function changeTabPanel(e) {
//     const targetTab = e.target;
//     const targetPanel = targetTab.getAttribute("aria-controls");
//     const targetImage = targetTab.getAttribute("data-image");

//     const tabContainer = targetTab.parentNode;
//     const mainContainer = tabContainer.parentNode;

//     tabContainer
//     .querySelector('[aria-selected="true"]')
//     .setAttribute("aria-selected", false);

//     targetTab.setAttribute("aria-selected", true);

//     // hide all the tabs
//     mainContainer
//     .querySelectorAll('[role="tabpanel"]')
//     .forEach((panel) => panel.setAttribute("hidden", true));;

//     // activate the hidden tab
//     mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
   
//     // hide all images
//     mainContainer
//     .querySelectorAll('picture')
//     .forEach((picture) => picture.setAttribute("hidden", true));

//     // show chosen image
//     mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
// }