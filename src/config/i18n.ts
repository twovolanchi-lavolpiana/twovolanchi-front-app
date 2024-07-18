import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 언어 리소스 설정
const resources = {
    en: {
        translation: {
            "guide-add-player-description": "You can add players by clicking on the Home Team Player or Away Team Player.",
            "guide-add-ball-description": "You can add a soccer ball by clicking on the Ball. Only one ball can be placed on the ground at a time. If you want to add a new ball, please remove the existing one first and then add the new one.",
            "guide-player-move-description": "After selecting a player, you can choose the desired position on the ground by clicking when the light appears. When you run the simulation, the player will move to the selected positions. You can see the selected positions connected by lines. To stop the movement, click on Player Stop. Ball Move works similarly for the ball.",
            "guide-player-back-description": "If you want to correct a player's movement, click on the player and then click on Player Back to return to the previous position. Ball Back works similarly for the ball.",
            "guide-player-remove-description": "To delete a player, click on the player and then select Remove. Ball Remove works similarly for the ball.",
            "guide-edit-title-description": "You can edit the title and description of your tactics. Please describe your amazing tactics, coach.",
            "guide-recommend-description": "Clicking on Recommend Formation will quickly set up recommended tactics and a recommended team.",
            "guide-player-list-description": "After adding players, you can check the Player List.",
            "guide-player-edit-description": "Double-click on a player to edit their name, back number, and position.",
            "guide-simulation-description": "You can run the simulation if you have set at least one movement for a player or the ball.",
            "guide-share-description": "The Share function provides a link to share your tactics. Edit URL allows you to modify the simulation. Share URL allows you to replay the simulation. Since there is no login feature, please remember your Edit URL and Share URL. If you lose them, please contact koseyundeploy@gmail.com",
            "guide-edit-tactics-description": "When you go to the Edit URL, your saved tactics will be displayed.  After modifying your tactics,  click Save to update them.  The Share URL and Edit URL will remain the same even if you modify the simulation",
            "guide-shared-tactics-description": "When you go to the Share URL, you can simulate the tactics created by the coach.  Shall we start creating tactics now?",
        }
    },
    ko: {
        translation: {
            "guide-add-player-description": "홈 팀 플레이어 혹은 어웨이 팀 플레이어를 클릭하여 플레이어를 추가할 수 있습니다.",
            "guide-add-ball-description": "축구공을 클릭하여 추가할 수 있습니다.축구공은 그라운드에 하나만 놓을 수 있습니다. 새로 추가하고 싶다면, 제거 후 다시 추가해주세요.",
            "guide-player-move-description": "플레이어를 선택한 후 빛이 들어오면 그라운드를 클릭하여 움직일 위치를 선택할 수 있습니다. 시뮬레이션을 실행하면 선택한 위치들로 플레이어가 움직입니다.어느 위치를 선택했는지 라인으로 확인할 수 있습니다. 움직임을 멈추고 싶다면 Player Stop을 클릭하면 됩니다. Ball Move도 공에 대해 동일하게 동작합니다.",
            "guide-player-back-description": "플레이어의 움직임을 정정하고 싶다면, 플레이어를 클릭한 후 Player Back을 클릭하여 이전 위치로 돌릴 수 있습니다. Ball Back도 공에 대해 동일하게 동작합니다.",
            "guide-player-remove-description": "플레이어를 삭제하고 싶다면, 플레이어를 클릭한 후 Remove를 선택합니다. Ball Remove도 공에 대해 동일하게 동작합니다.",
            "guide-edit-title-description": "전술에 대한 제목과 설명을 수정할 수 있습니다. 감독님의 멋진 전술을 설명해주세요.",
            "guide-recommend-description": "Recommend Formation을 클릭하면 추천 전술과 추천 팀을 빠르게 설정할 수 있습니다.",
            "guide-player-list-description": "플레이어를 추가하면 Player List에서 확인할 수 있습니다.",
            "guide-player-edit-description": "플레이어를 더블클릭하면 원하는 이름, 등번호, 포지션을 수정할 수 있습니다.",
            "guide-simulation-description": "플레이어나 공의 움직임을 하나 이상 설정한 경우 시뮬레이션을 실행할 수 있습니다.",
            "guide-share-description": "Share 기능을 통해 만든 전술을 공유할 수 있는 링크를 제공합니다. Edit URL은 시뮬레이션을 수정할 수 있는 기능을m Share URL은 시뮬레이션을 재생할 수 있는 기능을 제공합니다. 현재 로그인 기능이 없으므로 Edit URL과 Share URL을 반드시 기억해주세요. 저장하지 못한 경우 koseyundeploy@gmail.com에 문의해주세요.",
            "guide-edit-tactics-description": "Edit URL로 이동하면 작성한 전술이 저장되어 있습니다. 전술 수정 후 Save를 클릭하면 전술이 수정됩니다.이때, 시뮬레이션을 수정하더라도 Share URL과 Edit URL은 변경되지 않습니다.",
            "guide-shared-tactics-description": "Share URL로 이동하면 감독님이 만든 전술을 시뮬레이션할 수 있습니다. 이제 전술을 만들러 가볼까요?",
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
