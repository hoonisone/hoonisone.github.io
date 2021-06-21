// Classes //////////////////////////////////////////////////////////////////////////////////////////////////////
class JsonFileInforManager {
  /*
  resource에 대한 파일명과 경로를 생성해준다.
*/
  constructor(root) {
    this.root = root;
  }
  getFileName(resourceName) {
    return `${resourceName}.json`;
  }
  getFilePath(resourceName) {
    return this.root + this.getFileName(resourceName);
  }
}
class JsonResourceAccessor {
  /*
  url값을 통해 json파일을 get해주는 기능을 수행하는 json자원 Accessor
  */
  constructor(fileInforManager) {
    this.fileInforManager = fileInforManager;
  }
  getResource(resourceName) {
    return new Promise((resolve, reject) => {
      const url = this.fileInforManager.getFilePath(resourceName);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject();
          }
        }
      };
    });
  }
}
class JsonResourceManager {
  /*
  json data(이하 resource라 칭함)을 관리하는 객체
  - resource을 get할 수 있으며, 없다면 자동으로 JsonResourceAccessor를 통해 resource을 수집한 뒤 넘겨준다.
  - 해당 객체를 이용하는 입장에서 resource에 대한 접근(load)과정을 캡슐화해줌 
  */
  constructor(jsonResourceAccessor) {
    this.resources = {};
    this.jsonResourceAccessor = jsonResourceAccessor;
  }
  async loadResource(resourceName) {
    if (!this.isExistData(resourceName)) {
      this.resources[resourceName] = await this.jsonResourceAccessor.getResource(resourceName).then((data) => {
        return data;
      });
    }
    return;
  }
  async getResource(resourceName) {
    if (!this.isExistData(resourceName)) {
      await this.loadResource(resourceName).then();
    }
    return this.resources[resourceName];
  }

  isExistData(_name) {
    Object.keys(this.resources).includes(_name);
  }
}
class ListView {
  /*
  element를 넘기면 해당 element의 자식을 content로 관리해준다.
  - list형태로 구현
  - content 추가 삭제 기능 수행
  */
  constructor(element) {
    this.element = element;
  }
  emptyOut() {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }
  }
  appendContent(child) {
    this.element.appendChild(child);
  }
  popContent() {
    if (!this.isEmpty()) {
      this.element.removeChild(this.element.lastChild);
    }
  }
  isEmpty() {
    return this.getContentNum() === 0;
  }
  getContentNum() {
    return this.element.childElementCount;
  }
}
class JsonContentCreator {
  /*
  jsonData를 넘기면 Content Element를 만들어 준다.
  */
  createContent(data) {
    const div = document.createElement('div');
    div.className = 'content-box';

    div.innerHTML = `
    <a href=${data['url']}>
      <div class="content-grid">
        <div class="content-grid-item">
          <img class="content-img" src=${data['img']}>
        </div>
        <div class="content-grid-item">
          <div class="content-discription">
            <div class="content-title">${data['title']}</div>
            <div class="content-cp">출처: ${data['cp']}</div>
            <div class="content-link">링크: ${data['url']}</div>
          </div>
        </div>
      </div>
    </a>`;
    return div;
  }
}
class ListViewManager {
  /*
  ListView 객체를 넘기면 해당 객체에 대해 다양한 기능을 수행해준다.
  - 로딩 표현
  - 표현할 데이터 변경
  - 보여줄 데이터 개수 변경
  */
  constructor(listView, jsonContentCreator, loadingElement, resource) {
    this.listView = listView;
    this.jsonContentCreator = jsonContentCreator; // data를 넘기면 데이터를 표현하는 Content를 생성하는 객체
    this.resource = resource; // 표현할 Content들의 data 리스트
    this.loadingState = false; // listView가 로딩 상태 (true면 로딩중)
    this.loadingElement = loadingElement; // 로딩중일 때 보여줄 element
  }
  changeResource(resource) {
    this.resource = resource;
  }
  setLoadingState(flag) {
    if (this.flag === true) {
      if (flag === false) {
        this.listView.popContent();
      }
    } else if (this.flag === false) {
      if (flag === true) {
        this.listView.appendContent(this.loadingElement);
      }
    }
    this.flag = flag;
  }
  showNext() {
    if (this.loading === true) {
      return;
    }
    const nextContentIdx = this.getNextContentIdx();
    if (this.isInRange(nextContentIdx)) {
      const nextContentData = this.getContentData(nextContentIdx);
      const content = this.createContent(nextContentData);
      this.listView.appendContent(content);
    }
  }
  showMore(num) {
    if (this.loading === true) {
      return;
    }
    var lastContentIdx = this.getNextContentIdx() + num - 1;
    if (this.getResourceLength() - 1 < lastContentIdx) {
      lastContentIdx = this.getResourceLength() - 1;
    }
    for (var i = this.getNextContentIdx(); i <= lastContentIdx; i++) {
      this.showNext();
    }
  }
  show(num) {
    if (this.loading === true) {
      return;
    }
    this.listView.emptyOut();
    this.showMore(num);
  }
  emptyOut() {
    this.listView.emptyOut();
  }
  getContentData(idx) {
    if (this.isInRange(idx)) {
      return this.resource[idx];
    } else {
      throw new Error('getContentData(): idx is out of range');
    }
  }
  isInRange(idx) {
    return 0 <= idx && idx < this.getResourceLength();
  }
  getResourceLength() {
    return this.resource.length;
  }
  getContentNum() {
    return this.listView.getContentNum();
  }
  getNextContentIdx() {
    return this.getContentNum();
  }
  createContent(data) {
    return this.jsonContentCreator.createContent(data);
  }
  moreContentHandler() {
    listViewManager.setLoadingState(true);
    const timerId = setInterval(function () {
      listViewManager.setLoadingState(false);
      listViewManager.showMore(CONTENTS_MORE_SIZE);
      clearInterval(timerId);
    }, 1000);
  }
}
class TapManager {
  /*
  element를 넘기면 해당 element의 자식을 tab으로 관리해준다.
  - tab 선택 기능 수행
  */
  constructor(element) {
    this.element = element;
    this.curTap = this.getTab(0);
  }

  changeTab(tab) {
    if (this.findTab(tab) === -1) {
      return;
    }
    if (this.findTab(tab) === this.curTap) {
      return;
    }
    for (var i = 0; i < this.getTapCount(); i++) {
      this.getTabs()[i].className = '';
    }
    tab.className = 'active';
    this.curTap = tab;
  }

  getTabs() {
    return this.element.children;
  }
  getTab(idx) {
    return this.getTabs()[idx];
  }
  getTapCount() {
    return this.getTabs().length;
  }

  findTab(element) {
    const tabs = this.getTabs();
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i] === element) {
        return i;
      }
    }
    return -1;
  }
}
// Functions ////////////////////////////////////////////////////////////////////////////////////////////////////
async function tabChangeEventHandler(event) {
  const target = event.target.parentNode; // <li>인 Tab 태그 안에 <a>가 클릭되기 때문에 부모를 가져온다.
  if (tapManager.findTab(target) !== -1) {
    // target이 Tab에 해당하면
    if (target === tapManager.curTap) return;
    // 현재 가리키는 Tab이라면 무시
    else {
      tapManager.changeTab(target);
      const idx = tapManager.findTab(target);
      const resourceName = resourceNames[idx];
      const resourse = await this.jsonResourceManager.getResource(resourceName).then((resourse) => {
        return resourse;
      });
      listViewManager.changeResource(resourse);
      listViewManager.emptyOut();
      listViewManager.moreContentHandler();
    }
  }
}
function moreContentEventHandler(event) {
  const target = event.target.parentNode; // <div>인 more button안에 <button>객체가 클릭되기 때문에 부모를 가져온다.
  if (target === elements['more']) {
    listViewManager.moreContentHandler();
  }
}
function createLoadingElement() {
  const element = document.createElement('div');
  element.className = 'text-center';
  element.innerHTML = `<span class="glyphicon glyphicon-refresh">로딩중</span>`;
  return element;
}
// Data /////////////////////////////////////////////////////////////////////////////////////////////////////////
const resourceNames = ['recent', 'view', 'popular'];
const elements = {
  tabs: document.querySelector('#tabs'),
  list: document.querySelector('#list'),
  more: document.querySelector('#more'),
};
const CONTENTS_MORE_SIZE = 10; // 더 보기 버튼 클릭 시 추가할 Content 개수
// Main /////////////////////////////////////////////////////////////////////////////////////////////////////////

// 인스턴스 변수를 const로 하는경우.. 다른 객체에서 찾지 못하는?? 문제가 있어서 var로 통일하였다...
var jsonFileInforManager = new JsonFileInforManager('https://hoonisone.github.io/kakao/web2/1boonTab'); // json resoure의 파일명 및 경로 생성자 생성
var jsonResourceAccessor = new JsonResourceAccessor(jsonFileInforManager); // json resource 접근자 생성
var jsonResourceManager = new JsonResourceManager(jsonResourceAccessor); // json resource 관리자 생성
var listView = new ListView(elements['list']); // list element에 List기능을 더해주는 관리자 생성
var jsonContentCreator = new JsonContentCreator(); // jsonData 에 대한 content(element)생성자 생성
var loadingElement = createLoadingElement(); // loading시 나타날 element 객체
var listViewManager = new ListViewManager( // listView에 로딩상태와, 화면에 나타낼 content개수 조절 기능을 더하는 view 생성
  listView, // 관리한 listView 객체 전달
  jsonContentCreator, // content 생성자 전달
  loadingElement, // 로딩시 나타날 element 전달
  null // resource는 json파일을 불러온 후에 세팅할 예정
);
var tapManager = new TapManager(elements['tabs']); // tabs element에 Tab기능을 더해주는 관리자 생성

jsonResourceManager // 초기 Tag에 해당하는 json 데이터를 가져온 후 listViewManager에 세팅하고 content를 일정량 보여준다.
  .getResource(resourceNames[0]) // 첫번째 json데이터 가져오기
  .then((resource) => listViewManager.changeResource(resource)) // listViewManager에 resource 세팅
  .then(listViewManager.moreContentHandler()); // 정해진 개수 화면에 보이기

// Event enrolment
addEventListener('click', tabChangeEventHandler); // tab 클릭시 데이터 변경 및 재 출력 이벤트 설정
addEventListener('click', moreContentEventHandler); // 더보기 클릭시 데이터 추가 출력 이벤트 설정
