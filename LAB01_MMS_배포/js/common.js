/* Filename: common.js */
/* 로딩 체킹 콘솔창 출력 */
console.log("common.js loading");

/* 전역변수 item_img : 배열 선언 및 초기화(자동차 상세조회 이미지 정보)
    car_01_detail.png', 'car_02_detail.png', 'car_03_detail.png', 'car_04_detail.png'
 */
var item_img = ["car_01_detail.png", "car_02_detail.png", "car_03_detail.png", "car_04_detail.png"];

/* 전역변수 loginUser : 로그인 여부 boolean */
let loginUser = false;

/* 선택한 이미지의 상세보기 새창열기 함수 선언 : openItemDetail() */
function openItemDetail(takeItem) {
    console.log(item_img[takeItem]);
    var item_img_name = "img/" + item_img[takeItem];
    console.log("item_img_name", item_img_name);

    var url = "itemDetail.html?imgName=" + item_img_name;
    var name = "openItemWindow";
    var config =
        "toolbar=no,location=no,status=0,menubar=no,scrollbars=auto,resizable=yes,width=900,height=700,top=50,left=50";
    var childWindow = window.open(url, name, config);
}

/* 로그인 여부 체킹 함수 선언 : isLoginCheck() */
function isLoginCheck() {
    console.log("로그인 체크: " + loginUser);

    if (loginUser) {
        location.href = "boardList.html";
        return;
    }

    //alert('로그인 인증 후 서비스 이용하시기 바랍니다.');
    var isLogin = confirm("회원 전용 서비스 입니다.\n\n로그인 후 이용하시겠습니까?");
    if (isLogin) {
        location.href = "login.html";
    }
}

/* 로그인 인증 체킹 함수 : login()
    -- 로그인 요청 페이지: login.html
    1. 로그인 정보 가져오기: 아이디, 비밀번호
    2. 아이디, 비밀번호 입력여부, 공백제거 체킹
    3. 아이디(ssafy), 비밀번호(happy) 매칭 체킹
    4. 로그인 인증 성공처리
    5. 로그인 인증 실패처리
    6. 로그인 데이터 미입력 실패처리
*/
function login() {
    var memberId = document.getElementById("memberId").value;
    var memberPw = document.loginForm.memberPw.value;
    console.log(memberId, memberPw);
    if (memberId != null && memberId.trim().length > 0 &&
        memberPw != null && memberPw.trim().length > 0) {
            if (memberId == "ssafy" && memberPw == "happy") {
                loginUser = true;
                alert("[성공]\n회원 전용 서비스를 이용하시기 바랍니다.");
                location.href = "main.html";
            } else {
                alert("[실패]\n회원 로그인 정보가 올바르지 않습니다.\n다시 로그인 하시기 바랍니다.");
                // location.reload();
                document.getElementById("memberId").focus();
                // document.getElementById("memberId").select();
            }
    } else {
        alert("[실패]\n로그인 정보를 모두 입력하시기 바랍니다.");
    }
}
