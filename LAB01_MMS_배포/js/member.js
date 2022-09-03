/* Filename: member.js 
    -- 회원 관련 
    -- 아이디 중복확인, 비밀번호 보이기/감추기
*/

/* 아이디 중복확인 새창 열기 */
function openCheckId() {
    let url = "checkMemberId.html";
    let name = "checkIdOpenWindow"; 
    let config = "width=900,height=800,top=50,left=50";
    window.open(url, name, config);
}

/* 회원정보 자료 저장구조 
    1. 사용자 객체 생성 => 배열객체, JSON
    2. 아이디정보 배열
    3. 로컬스토리지
*/
//2. 아이디정보 배열
let memberIdList = ["user01", "user02", "user03"];

/* 1. 사용자 객체 생성 : 회원 */
// package 선언
com = {};
com.ssafy = {};
// 생성자함수(class) 선언
com.ssafy.Member = function (memberId, memberPw, name, mobile, email) {
    this.memberId = memberId;
    this.memberPw = memberPw;
    this.name = mobile;
    this.email = email;
}
// JSON method 바인딩 선언
com.ssafy.Member.prototype = {
    getMemberId: function () { return this.memberId; },
    setMemberPw: function (memberPw) { this.memberPw = memberPw; },
    getMemberPw: function () { return this.memberPw },
    setName: function (name) { this.name = name; },
    getMobile: function () { return this.mobile; },
    setMobile: function (mobile) { this.mobile = mobile; },
    getEmail: function () { return this.email; },
    setEmail: function (email) { this.email = email; },
    toString: function () {
        let info = "";
        info += this.memberId;
        info += ", ";
        info += this.memberPw;
        info += ", ";
        info += this.name;
            info += ", ";
        info += this.mobile;
            info += ", ";
        info += this.email;
        return info;        
    }
}

/* 회원객체 정보 초기화 함수 */
let members = [
    new com.ssafy.Member("user01", "password01", "홍길동", "010-1234-1000", "user01.work.com"),
    new com.ssafy.Member("user02", "password02", "강감찬", "010-1234-2000", "user02.work.com"),
    new com.ssafy.Member("user03", "password03", "이순신", "010-1234-3000", "user03.work.com")
];

/* 중복체킹 아이디사용하기 */
function useCheckId() {
    // 중복체킹아이디를 가져와서 부모의 아이디로 초기화
    opener.document.getElementById("memberId").value = document.getElementById("checkId").value;
    // 부모의 아이디를 읽기전용으로 변경하고
    opener.document.getElementById("memberId").setAttribute("readOnly", "readOnly");
    // 부모의 아이디 백그라운색상 변경하고
    // 1. css 파일에 등록 되어 있어야함
    //.readOnly {  background-color: #059862; color: #fff;}
    opener.document.getElementById("memberId").setAttribute("class", "readOnly"); 
    // 2.  style="background-color:red"
    //opener.document.getElementById("memberId").style.backgroundColor = "cyan";
    
    // 부모의 비밀번호로 포커스이동하고
    opener.document.getElementById("memberPw").focus();
    // 창닫기
    window.close();
}

/* 아이디 중복여부 체킹 : checkId() 
    주의사항: id, 함수명이 동일한 경우 문제 발생함
    기존 함수명: checkId()
    <input type="text" name="checkId" id="checkId" autofocus>
*/
function clickCheckId() {
    // 아이디 입력 엘리먼트 가져오기
    let checkIdElement = document.getElementById("checkId");

    // 아이디 입력 데이터 가져오기
    // let checkId = document.getElementById("checkId").value;
    let checkId = checkIdElement.value;

    // 결과메세지 출력 엘리먼트 가져오기
    let resultElement = document.getElementById("result");
    resultElement.style.display = "block";
    resultElement.innerHTML = "";

    // 아이디 필수 입력, 4자리 ~ 30자리 이내
    if (checkId != null && checkId.trim().length >= 4 && checkId.trim().length <= 30) {
        // 배열 아이디 정보 비교
        // for (index = 0; index < memberIdList.length; index++) {
        //     if (memberIdList[index] == checkId) {
        //         // 사용불가 메세지 출력
        //         resultElement.innerHTML = "사용불가합니다.";
        //         resultElement.setAttribute("class", "error_message");
        //         // 아이디로 포커스 이동
        //         document.getElementById("checkId").focus();
        //         return;
        //     }
        // }

        // 사용자 정의 객체 정보 비교
        for (index = 0; index < members.length; index++) {
            if (members[index].getMemberId() == checkId) {
                //debug: 콘솔창 확인해보기
                console.log(members[index].toString());

                // 사용불가 메세지 출력
                resultElement.innerHTML = "사용불가합니다.";
                resultElement.setAttribute("class", "error_message");
                // 아이디로 포커스 이동
                document.getElementById("checkId").focus();
                return;
            }
        }

        // 아이디 사용가능처리
        resultElement.innerHTML = "사용가능합니다.";
        resultElement.setAttribute("class", "success_message");
        document.getElementById("btnUseCheckId").removeAttribute("disabled");
        //document.getElementById("btnUseCheckId").disabled = false;

    } else {
        resultElement.innerHTML = "[알림] 아이디는 최소 4자 ~ 30자 이내로 입력하시기 바랍니다.";
        resultElement.setAttribute("class", "error_message");
        document.getElementById("checkId").focus();
    }
}

/* 중복확인 창 초기화하기 
    1. 아이디 지우기
    2. 메세지 출력 지우기
*/
function clearCheckId() {
    document.getElementById("checkId").value = ""; 
    let resultElement = document.getElementById("result");
    resultElement.style.display = "none";  
}

/* 비밀번호 보이기/감추기 : memberInput.html 참고
    -- 보이기/감추기 이미지와 checkbox 동기화 함께 처리함
    <img src="img/show.png" id="imgShow" onclick="clickShow()"><br/>
    <input type="checkbox" name="checkboxShow" id="checkboxShow" onclick="clickShow()">
    <span id="textShow">보이기</span>
*/
function clickShow() {
    // 비밀번호, 비밀번호 확인 엘리먼트 가져오기
    let memberPwElement = document.getElementById("memberPw");
    let memberPwConfirmElement = document.getElementById("memberPwConfirm");

    // 이미지 보이기/감추기
    let img = ["img/show.png", "img/hide.png"];
    let text = ["보이기", "감추기"];
    let imgShowElement = document.getElementById("imgShow");
    let textShowElement = document.getElementById("textShow");

    // 콘솔 결과 확인해보기 : http://127.0.0.1:5500/LAB01_MMS/img/show.png
    console.log(imgShowElement.src);

    let imgUrl = imgShowElement.src;
    let imgName = imgUrl.substring(imgUrl.lastIndexOf("/")+1);
    console.log(imgName); // show.png, hide.png

    if (img[0].substring(img[0].lastIndexOf("/")+1) == imgName) {
        // 보이기
        imgShowElement.src = img[1];
        memberPwElement.setAttribute("type", "text");
        memberPwConfirmElement.setAttribute("type", "text");

        // checkbox 이미지와 동기화 시키기
        document.getElementById("checkboxShow").checked = true;

    } else if (img[1].substring(img[0].lastIndexOf("/") + 1) == imgName) {
        // 감추기
        imgShowElement.src = img[0];
        memberPwElement.setAttribute("type", "password");
        memberPwConfirmElement.setAttribute("type", "password");

        // checkbox 이미지와 동기화 시키기
        document.getElementById("checkboxShow").checked = false;
    }

    // checkbox 보이기/감추기
    let checkboxShowElement = document.getElementById("checkboxShow");
    if (checkboxShowElement.checked) {
        imgShowElement.src = img[1];
        textShowElement.innerText = text[1];

        memberPwElement.setAttribute("type", "text");
        memberPwConfirmElement.setAttribute("type", "text");
    } else {
        imgShowElement.src = img[0];
        textShowElement.innerText = text[0];

        memberPwElement.setAttribute("type", "password");
        memberPwConfirmElement.setAttribute("type", "password");
    }
}

/* 비밀번호와 비밀번호확인 매핑 이벤트 처리 
    -- see: memberInput.html
    <span id="memberPwMessage"></span>
*/
function keyupMemberPw() {
    let memberPwElement = document.getElementById("memberPw");
    let memberPwConfirmElement = document.getElementById("memberPwConfirm");
    let memberPwMessageElement = document.getElementById("memberPwMessage");

    if (memberPwConfirmElement.value.length > 1 && memberPwElement.value == memberPwConfirmElement.value) {
        memberPwMessageElement.innerText = "비밀번호가 일치합니다.";
        memberPwMessageElement.setAttribute("class", "success_message");
    } else {
        memberPwMessageElement.innerText = "비밀번호가 일치하지 않습니다.";
        memberPwMessageElement.setAttribute("class", "error_message");
    }
}

/* 회원가입 
    -- see: memberInput.html
    <form action="javascript:actionMemberInput()" method="get" name="memberInputForm">
    <input type="text" name="memberId" id="memberId">
*/
function actionMemberInput() {
  //let memberId = document.getElementById("memberId").value;
    let memberId = document.memberInputForm.memberId.value;
    let memberPw = document.getElementById("memberPw").value;
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;

    let dto = new com.ssafy.Member(memberId, memberPw, name, mobile, email);
    console.log(dto.toString());

    // document.memberInputForm.submit();

    alert("[성공]\n회원가입이 완료되었습니다.\n로그인 후 회원전용 서비스를 이용하시기 바랍니다.");
    location.href = "login.html";
}