<template>
  <div class="container">
    <div class="controls" v-if="selectPlayer !== null">
      <button @click="resetCurrentPlayerLine">선수 움직임 리셋</button>
      <button @click="savePlayerLine">플레이어 움직임 저장</button>
    </div>
    <div class="buttons">
      <button @click="resetPositions">리셋</button>
      <button @click="startSimulation">시뮬레이션 시작</button>
    </div>
    <div class="soccer-field" @dragover.prevent @drop="drop" @click="setPoint">
      <div class="image-container">
        <img src="@/assets/soccer-dashboard.jpg" alt="Soccer Field" class="field-image" ref="fieldImage" @load="updateCanvasSize"/>
        <canvas ref="canvas" class="field-canvas"></canvas>
      </div>
      <draggable
        v-model="blueTeam.players"
        :item-key="'number'"
        :options="{ group: 'players', ghostClass: 'ghost', animation: 150 }"
        @start="dragStart"
        @end="dragEnd"
        @change="updatePlayerPosition(blueTeam, $event)"
        ref="blueDraggable"
      >
        <template #item="{ element, index }">
          <div
            v-if="element"
            class="player-icon blue"
            :style="{ top: element.top, left: element.left, backgroundColor: selectPlayer.selectedPlayer?.number === index && selectPlayer.selectedTeam?.teamColor === teamColor.Blue ? 'yellow' : 'blue' }"
            @click.stop="changePlayer(index, blueTeam)"
          >
            {{ element.number }}
          </div>
        </template>
      </draggable>
      <draggable
        v-model="redTeam.players"
        :item-key="'number'"
        :options="{ group: 'players', ghostClass: 'ghost', animation: 150 }"
        @start="dragStart"
        @end="dragEnd"
        @change="updatePlayerPosition(redTeam, $event)"
        ref="redDraggable"
      >
        <template #item="{ element, index }">
          <div
            v-if="element"
            class="player-icon red"
            :style="{ top: element.top, left: element.left, backgroundColor: selectPlayer.selectedPlayer?.number === index && selectPlayer.selectedTeam?.teamColor == teamColor.Red ? 'yellow' : 'red' }"
            @click.stop="changePlayer(index, redTeam)"
          >
            {{ element.number }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import Team from '@/domain/Team';
import Player from '@/domain/Player';
import TeamColor from '@/domain/TeamColor';
import Ball from '@/domain/Ball';
import BallSequenceLine from '@/domain/BallSequenceLine';
import PlayerSequenceLine from '@/domain/PlayerSequenceLine';
import Sequence from '@/domain/Sequence';
import Line from '@/domain/Line';
import SelectPlayer from '@/domain/SelectPlayer';

export default defineComponent({
  components: {
    draggable,
  },
  setup() {
    const resetBlueTeam = new Team(TeamColor.Blue,
        new Player(1, '90%', '47.5%'),
        new Player(2, '80%', '20%'),
        new Player(4, '80%', '35%'),
        new Player(5, '80%', '55%'),
        new Player(3, '80%', '75%'),
        new Player(6, '70%', '65%'),
        new Player(8, '70%', '30%'),
        new Player(10, '60%', '47.5%'),
        new Player(7, '60%', '20%'),
        new Player(11, '60%', '75%'),
        new Player(9, '52%', '47.5%'),
      )
    const resetRedTeam = new Team(TeamColor.Red,
        new Player(1, "5%", "47.5%"),
        new Player(2, "14%", "20%%"),
        new Player(4, "14%", "35%"),
        new Player(5, "14%", "55%"),
        new Player(3, "14%", "75%"),
        new Player(6, "24%", "65%"),
        new Player(8, "24%", "30%"),
        new Player(10, "34%", "47.5%"),
        new Player(7, "34%", "20%"),
        new Player(11, "34%", "75%"),
        new Player(9, "42%", "47.5%"),
      )


    const blueTeam = new Team(TeamColor.Blue,
        new Player(1, '90%', '47.5%'),
        new Player(2, '80%', '20%'),
        new Player(4, '80%', '35%'),
        new Player(5, '80%', '55%'),
        new Player(3, '80%', '75%'),
        new Player(6, '70%', '65%'),
        new Player(8, '70%', '30%'),
        new Player(10, '60%', '47.5%'),
        new Player(7, '60%', '20%'),
        new Player(11, '60%', '75%'),
        new Player(9, '52%', '47.5%'),
      )
    const redTeam = new Team(TeamColor.Red,
        new Player(1, "5%", "47.5%"),
        new Player(2, "14%", "20%%"),
        new Player(4, "14%", "35%"),
        new Player(5, "14%", "55%"),
        new Player(3, "14%", "75%"),
        new Player(6, "24%", "65%"),
        new Player(8, "24%", "30%"),
        new Player(10, "34%", "47.5%"),
        new Player(7, "34%", "20%"),
        new Player(11, "34%", "75%"),
        new Player(9, "42%", "47.5%"),
      )
    const initialBall = new Ball('50%', '50%');
    const initialBallSequenceLine = new BallSequenceLine(initialBall);
    const initialPlayerSequenceLines: PlayerSequenceLine[] = [];
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const fieldImage = ref<HTMLElement | null>(null);
    let sequence = new Sequence(1, initialBallSequenceLine, initialPlayerSequenceLines);
    let selectPlayer = new SelectPlayer(null, null)
    let sequences = [] as Sequence[]

    let draggingPlayer = ref<number | null>(null);
    let draggingTeam = ref<string | null>(null);
    const blueDraggable = ref(null);
    const redDraggable = ref(null);

    const updateCanvasSize = () => {
        if (fieldImage && fieldImage.value && canvas && canvas.value) {
          canvas.value.width = fieldImage.value.clientWidth;
          canvas.value.height = fieldImage.value.clientHeight;
          drawLines();
        }
      };

    const clearCanvas = () => {
      if (ctx && ctx.value && canvas && canvas.value) {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      }
    };

    const drawLines = () => {
      clearCanvas();
      if (selectPlayer.points.length > 0 && selectPlayer.selectedTeam && selectPlayer.selectedPlayer
          && ctx && ctx.value && 
          canvas && canvas.value) {
        const { left, top } = selectPlayer.selectedTeam.teamColor === TeamColor.Blue
        ? blueTeam.players[selectPlayer.selectedPlayer.number - 1]
        : redTeam.players[selectPlayer.selectedPlayer.number - 1];
        const startX = (parseFloat(left) / 100) * canvas.value.clientWidth + 15; // Add half the icon width
        const startY = (parseFloat(top) / 100) * canvas.value.clientHeight + 15; // Add half the icon height

        ctx.value.strokeStyle = 'black'; // Change line color to black
        ctx.value.lineWidth = 2;
        ctx.value.beginPath();
        ctx.value.moveTo(startX, startY);

        for (const point of selectPlayer.points) {
          const x = (point.x / 100) * canvas.value.clientWidth;
          const y = (point.y / 100) * canvas.value.clientHeight;
          ctx.value.lineTo(x, y);
        }
        ctx.value.stroke();
      }
    }

    const addSequence = () => {
      const ballSequenceLineCopy = new BallSequenceLine(sequence.ballSequenceLine.ball);
      sequence.ballSequenceLine.lines.forEach(line => ballSequenceLineCopy.addLine(new Line(line.x, line.y)));
      const playerSequenceLinesCopy = sequence.playerSequenceLines.map(line => {
        const playerSequenceLine = new PlayerSequenceLine(line.player);
        line.lines.forEach(linePoint => playerSequenceLine.addLine(new Line(linePoint.x, linePoint.y)));
        return playerSequenceLine;
      });

      const newSequence = new Sequence(sequence.number + 1, ballSequenceLineCopy, playerSequenceLinesCopy);

      sequences.push(newSequence);
    };

    const startSimulation = () => {
      animatePlayers();
    };

    const savePlayerLine = () => {
      selectPlayer.savePlayerLine();
      clearCanvas();
    };

    const animatePlayers = (callback?: () => void) => {
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;

        for (const key in selectPlayer.savedLines) {
          const [team, playerIndex] = key.split('-');
          const index = parseInt(playerIndex, 10);
          const player = team === 'blue' ? blueTeam.players[index] : redTeam.players[index];
          const points = selectPlayer.savedLines[key] || [];

          if (points.length > 0) {
            const totalDuration = 2000; // 2 seconds for animation
            const progress = Math.min(elapsed / totalDuration, 1);

            const currentIndex = Math.floor(progress * (points.length - 1));
            const nextIndex = Math.min(currentIndex + 1, points.length - 1);
            const pointProgress = (progress * (points.length - 1)) % 1;

            const currentPoint = points[currentIndex] || { x: 0, y: 0 };
            const nextPoint = points[nextIndex] || { x: 0, y: 0 };

            const x = currentPoint.x + (nextPoint.x - currentPoint.x) * pointProgress;
            const y = currentPoint.y + (nextPoint.y - currentPoint.y) * pointProgress;

            player.move(`${y}%`, `${x}%`);
          }
        }

        if (elapsed < 2000) {
          requestAnimationFrame(animate);
        } else if (callback) {
          callback();
        }
      };

      requestAnimationFrame(animate);
    };

    const dragStart = (event: any) => {
      draggingPlayer.value = event.oldIndex;
      draggingTeam.value = event.from === blueDraggable.value ? 'blue' : 'red';
    };

    const dragEnd = (event: any) => {
      const newIndex = event.newIndex;
      const team = event.from === blueDraggable.value ? 'blue' : 'red';
      const updatedTeam = team === 'blue' ? blueTeam.players : redTeam.players;

      if (draggingPlayer && draggingPlayer.value) {
        if (updatedTeam[draggingPlayer.value] && updatedTeam[newIndex]) {
          updatedTeam[newIndex].top = updatedTeam[draggingPlayer.value].top;
          updatedTeam[newIndex].left = updatedTeam[draggingPlayer.value].left;
        }
      }
      draggingPlayer.value = null;
      draggingTeam.value = null;
    };

    const resetPositions = () => {
      for (let i = 0; i < blueTeam.players.length; i++) {
        blueTeam.players[i].top = resetBlueTeam.players[i].top;
        blueTeam.players[i].left = resetBlueTeam.players[i].left;
      }
      // redTeam 복사
      for (let i = 0; i < redTeam.players.length; i++) {
        redTeam.players[i].top = resetRedTeam.players[i].top;
        redTeam.players[i].left = resetRedTeam.players[i].left;
      }
      sequences = [];
      selectPlayer.reset();
      clearCanvas();
    };
    
    const changePlayer = (index: number, team: Team) => {
      const selectedTeam = team.teamColor === TeamColor.Blue ? blueTeam : redTeam;
      selectPlayer.selectedPlayer = selectedTeam.players[index];
      selectPlayer.selectedTeam = selectedTeam;
      selectPlayer.points = selectPlayer.savedLines[`${team}-${index}`] || [];
      drawLines();
    };

    const resetCurrentPlayerLine = () => {
      selectPlayer.resetCurrentPlayerLine();
      clearCanvas();
    };
    
    const setPoint = (event: any) => {
      if (selectPlayer.selectedPlayer !== null && canvas && canvas.value) {
        const x = (event.offsetX / canvas.value.clientWidth) * 100;
        const y = (event.offsetY / canvas.value.clientHeight) * 100;
        selectPlayer.setPoint(x, y);
        // lineDrawn = true;
        drawLines();
      }
    };

    const drop = (event: any) => {
      if (canvas && canvas.value) {
        const xOffset = (event.offsetX / canvas.value.clientWidth) * 100;
        const yOffset = (event.offsetY / canvas.value.clientHeight) * 100;
        if (draggingTeam.value === 'blue' && draggingPlayer.value) {
          blueTeam.players[draggingPlayer.value].left = `${xOffset}%`;
          blueTeam.players[draggingPlayer.value].top = `${yOffset}%`;
        } else if (draggingTeam.value === 'red' && draggingPlayer.value) {
          redTeam.players[draggingPlayer.value].left = `${xOffset}%`;
          redTeam.players[draggingPlayer.value].top = `${yOffset}%`;
        }
        draggingPlayer.value = null;
        draggingTeam.value = null;
      }
    };

    const updatePlayerPosition = (team: Team, event: any) => {
      const updatedTeam = team.teamColor === TeamColor.Blue ? blueTeam : redTeam;
      event.moved.newIndex.forEach((player: Player, index: number) => {
        updatedTeam.players[index].top = player.top;
        updatedTeam.players[index].left = player.left;
      });
    }
    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value.getContext('2d');
      }
    });
    return {
      blueTeam: blueTeam,
      redTeam: redTeam,
      draggingPlayer: null as Player | null,
      draggingTeam: null as Team | null,
      sequence: sequence as Sequence,
      sequences: [sequence] as Sequence[],
      selectPlayer: new SelectPlayer(null, null),
      canvas: canvas,
      ctx: ctx,
      teamColor: TeamColor,
      dragStart: dragStart,
      dragEnd: dragEnd,
      drop: drop,
      updateCanvasSize: updateCanvasSize,
      addSequence: addSequence,
      startSimulation: startSimulation,
      savePlayerLine: savePlayerLine,
      resetCurrentPlayerLine: resetCurrentPlayerLine,
      resetPositions: resetPositions,
      setPoint: setPoint,
      updatePlayerPosition: updatePlayerPosition,
      changePlayer: changePlayer
    };
  }
});

import '../css/SoccerField.css';
</script>
