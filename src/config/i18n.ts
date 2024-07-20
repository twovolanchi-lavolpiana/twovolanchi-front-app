import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 언어 리소스 설정
const resources = {
    en: {
        translation: {
            "guide-add-player-title": "Add Player",
            "guide-add-player-description": "You can add players by clicking on the Home Team Player or Away Team Player.",

            "guide-add-ball-title": "Add Ball",
            "guide-add-ball-description": "You can add a soccer ball by clicking on the Ball. Only one ball can be placed on the ground at a time. If you want to add a new ball, please remove the existing one first and then add the new one.",

            "guide-player-move-title": "Player Move",
            "guide-player-move-description": "After selecting a player, you can drag and drop for initial location or choose the desired position on the ground by clicking when the light appears. When you run the simulation, the player will move to the selected positions. You can see the selected positions connected by lines. To stop the movement, click on Player Stop. Ball Move works similarly for the ball.",

            "guide-player-back-title": "Player Back",
            "guide-player-back-description": "If you want to correct a player's movement, click on the player and then click on Player Back to return to the previous position. Ball Back works similarly for the ball.",

            "guide-player-remove-title": "Player Remove",
            "guide-player-remove-description": "To delete a player, click on the player and then select Remove. Ball Remove works similarly for the ball.",

            "guide-edit-title-title": "Edit Title",
            "guide-edit-title-description": "You can edit the title and description of your tactics. Please describe your amazing tactics, coach.",

            "guide-recommend-title": "Recommend",
            "guide-recommend-description": "Clicking on Recommend Formation will quickly set up recommended tactics and a recommended team.",

            "guide-player-list-title": "Player List",
            "guide-player-list-description": "After adding players, you can check the Player List.",

            "guide-player-edit-title": "Player Edit",
            "guide-player-edit-description": "Double-click on a player to edit their name, back number, and position.",

            "guide-simulation-title": "Simulation",
            "guide-simulation-description": "You can run the simulation if you have set at least one movement for a player or the ball.",

            "guide-share-title": "Share",
            "guide-share-description": "The Share function provides a link to share your tactics. Edit URL allows you to modify the simulation. Share URL allows you to replay the simulation. Since there is no login feature, please remember your Edit URL and Share URL. If you lose them, please contact koseyundeploy@gmail.com",

            "guide-edit-tactics-title": "Shared Tactics Edit",
            "guide-edit-tactics-description": "When you go to the Edit URL, your saved tactics will be displayed.  After modifying your tactics,  click Save to update them.  The Share URL and Edit URL will remain the same even if you modify the simulation",

            "guide-shared-tactics-title": "Shared Tactics",
            "guide-shared-tactics-description": "When you go to the Share URL, you can simulate the tactics created by the coach.  Shall we start creating tactics now?",

            "Home Team Player": "Home Team Player",
            "Away Team Player": "Away Team Player",
            "Ball": "Ball",
            "Player Move": "Player Move",
            "Player Back": "Player Back",
            "Player Stop": "Player Stop",
            "Player Remove": "Player Remove",
            "Ball Move": "Ball Move",
            "Ball Back": "Ball Back",
            "Ball Stop": "Ball Stop",
            "Ball Remove": "Ball Remove",
            "Simulation": "Simulation",
            "Simulation Reset": "Simulation Reset",
            "Ground Reset": "Ground Reset",
            "Recommend Formation": "Recommend Formation",
            "Share": "Share",

            "Position": "Position",
            "Name": "Name",
            "No": "No",

            "Edit Player": "Edit Player",
            "Back Number": "Back Number",
            "Save": "SAVE",
            "Cancel": "CANCEL",

            "Edit Details": "Edit Details",
            "Title": "Title",
            "Description": "Description",

            "Home Team Formation": "Home Team Formation",
            "Home Team": "Home Team",
            "Away Team Formation": "Away Team Formation",
            "Away Team": "Away Team",

            "Share Message": "Please use the links below to edit or share your data! 😄",
            "Edit URL": "Edit URL",
            "Share URL": "Share URL",

            "GUIDE": "GUIDE",
            "INTRODUCE": "INTRODUCE",
            'Mobile Snack Bar': "Sorry, Mobile view may not display correctly. Please access from a desktop!",

            'Exciting New Plans Coming Soon!': 'Exciting New Plans Coming Soon!',
            '/ month': '/ month',
            'Default Team Color': 'Default Team Color',
            'Default Green Ground': 'Default Green Ground',
            'Default Player Icon': 'Default Player Icon',
            '3 Team Recommendations': '3 Team Recommendations',
            'Simulation Play': 'Simulation Play',
            'Custom Team Color': 'Custom Team Color',
            '10 Special Grounds': '10 Special Grounds',
            'Custom Player Image': 'Custom Player Image',
            'Recommendations for 50 Teams Including 5 League': 'Recommendations for 50 Teams Including 5 League',
            'Simulation Play & Download': 'Simulation Play & Download'
        }
    },
    ko: {
        translation: {
            "guide-add-player-title": "플레이어 추가",
            "guide-add-player-description": "홈 팀 플레이어 혹은 어웨이 팀 플레이어를 클릭하여 플레이어를 추가할 수 있습니다.",

            "guide-add-ball-title": "축구공 추가",
            "guide-add-ball-description": "축구공을 클릭하여 추가할 수 있습니다.축구공은 그라운드에 하나만 놓을 수 있습니다. 새로 추가하고 싶다면, 제거 후 다시 추가해주세요.",

            "guide-player-move-title": "플레이어 이동",
            "guide-player-move-description": "플레이어를 선택한 후 빛이 들어오면 그라운드를 드래그 앤 드롭하여 기존 위치를 변경하거나, 클릭하여 움직일 위치를 선택할 수 있습니다. 시뮬레이션을 실행하면 선택한 위치들로 플레이어가 움직입니다.어느 위치를 선택했는지 라인으로 확인할 수 있습니다. 움직임을 멈추고 싶다면 Player Stop을 클릭하면 됩니다. Ball Move도 공에 대해 동일하게 동작합니다.",

            "guide-player-back-title": "플레이어 이동 되돌리기",
            "guide-player-back-description": "플레이어의 움직임을 정정하고 싶다면, 플레이어를 클릭한 후 Player Back을 클릭하여 이전 위치로 돌릴 수 있습니다. Ball Back도 공에 대해 동일하게 동작합니다.",

            "guide-player-remove-title": "플레이어 제거",
            "guide-player-remove-description": "플레이어를 삭제하고 싶다면, 플레이어를 클릭한 후 Remove를 선택합니다. Ball Remove도 공에 대해 동일하게 동작합니다.",

            "guide-edit-title-title": "전술 설명 편집",
            "guide-edit-title-description": "전술에 대한 제목과 설명을 수정할 수 있습니다. 감독님의 멋진 전술을 설명해주세요.",

            "guide-recommend-title": "추천",
            "guide-recommend-description": "Recommend Formation을 클릭하면 추천 전술과 추천 팀을 빠르게 설정할 수 있습니다.",

            "guide-player-list-title": "플레이어 목록",
            "guide-player-list-description": "플레이어를 추가하면 Player List에서 확인할 수 있습니다.",

            "guide-player-edit-title": "플레이어 편집",
            "guide-player-edit-description": "플레이어를 더블클릭하면 원하는 이름, 등번호, 포지션을 수정할 수 있습니다.",

            "guide-simulation-title": "시뮬레이션",
            "guide-simulation-description": "플레이어나 공의 움직임을 하나 이상 설정한 경우 시뮬레이션을 실행할 수 있습니다.",

            "guide-share-title": "공유하기",
            "guide-share-description": "Share 기능을 통해 만든 전술을 공유할 수 있는 링크를 제공합니다. Edit URL은 시뮬레이션을 수정할 수 있는 기능, Share URL은 시뮬레이션을 재생할 수 있는 기능을 제공합니다. 혹시 링크를 저장하지 못하신 경우에는 koseyundeploy@gmail.com에 문의해주세요.!",

            "guide-edit-tactics-title": "공유한 전술 편집",
            "guide-edit-tactics-description": "Edit URL로 이동하면 작성한 전술이 저장되어 있습니다. 전술 수정 후 Save를 클릭하면 전술이 수정됩니다. 시뮬레이션을 수정하더라도 Share URL과 Edit URL은 변경되지 않습니다.",

            "guide-shared-tactics-title": "공유한 전술",
            "guide-shared-tactics-description": "Share URL로 이동하면 감독님이 만든 전술을 시뮬레이션할 수 있습니다. 이제 전술을 만들러 가볼까요?",

            "Home Team Player": "홈 플레이어 추가",
            "Away Team Player": "어웨이 플레이어 추가",
            "Ball": "축구공 추가",
            "Player Move": "플레이어 이동",
            "Player Back": "플레이어 이동 되돌리기",
            "Player Stop": "플레이어 이동 정지",
            "Player Remove": "플레이어 제거",
            "Ball Move": "축구공 이동",
            "Ball Back": "축구공 이동 되돌리기",
            "Ball Stop": "축구공 이동 정지",
            "Ball Remove": "축구공 제거",
            "Simulation": "시뮬레이션",
            "Simulation Reset": "시뮬레이션 리셋",
            "Ground Reset": "그라운드 리셋",
            "Recommend Formation": "추천 포메이션",
            "Share": "공유하기",

            "Position": "포지션",
            "Name": "이름",
            "No": "등번호",

            "Edit Player": "플레이어 편집",
            "Back Number": "등번호",
            "Save": "저장",
            "Cancel": "취소",

            "Edit Details": "전술 편집",
            "Title": "제목",
            "Description": "설명",

            "Home Team Formation": "홈 팀 포메이션",
            "Home Team": "홈 팀",
            "Away Team Formation": "어웨이 팀 포메이션",
            "Away Team": "어웨이 팀",
            
            "Share Message": "편집 혹은 공유를 위해 하단의 링크를 복사해서 저장해주세요! 😄",
            "Edit URL": "편집 URL",
            "Share URL": "공유 URL",

            "GUIDE": "가이드",
            "INTRODUCE": "소개",
            'Mobile Snack Bar': "모바일은 화면이 일부 올바르지 않을 수 있습니다. 데스크톱으로 접속해주세요!",
            
            'Exciting New Plans Coming Soon!': '새로운 플랜이 출시됩니다!',
            '/ month': '/ 월',
            'Default Team Color': '기본 팀 컬러 제공',
            'Default Green Ground': '기본 그라운드 제공',
            'Default Player Icon': '기본 플레이어 아이콘 제공',
            '3 Team Recommendations': '3개의 추천 팀 제공',
            'Simulation Play': '시뮬레이션 플레이 제공',
            'Custom Team Color': '커스텀 팀 컬러 제공',
            '10 Special Grounds': '10개 스폐셜 그라운드 제공',
            'Custom Player Image': '플레이어 이미지 설정 제공',
            'Recommendations for 50 Teams Including 5 League': '5대 리그 포함 50개 추천 팀 제공',
            'Simulation Play & Download': '시뮬레이션 및 다운로드 제공'
        }
    }
};

// i18n 초기화
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // 기본 언어 설정
        fallbackLng: 'en', // 사용할 수 없는 경우 기본 언어 설정
        interpolation: {
            escapeValue: false // react는 이미 xss를 방지합니다.
        }
    });

export default i18n;
