<template>

    <div class="magin_box">
        <div style="width: 100%" class="box_da">
            <div class="box">
                <div>
                    <van-icon @click="start" v-if="state" name="pause-circle-o"/>
                    <van-icon @click="end" v-else name="play-circle-o"/>
                </div>
                <div class="slider">
                    <van-slider @change="setTime" bar-height="10px" button-size="10px" v-model="value" :max="maxvalue"/>
                </div>
                <div class="time">
                    <span>{{ value }} / {{ maxvalue }}s</span>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import {Howl} from "howler";

export default {
    name: "test",
    props: {
        setData: {
            type: Boolean,
            default: true,
        },
        src: {
            type: String,
            default: 'http://s.199909.xyz/storage/audio/20230628/q-6001-unknown-20230627-103851-1687833517.7813.wav',
            required: true,
        }
    },
    setup(props) {
        let value = ref(0)
        let maxvalue = ref(0)
        let state = ref(false);
        let times = null;

        let sound = new Howl({
            src: props.src,
            // html5: true,
            autoplay: true,
            onload: function () {
                maxvalue.value = parseInt(sound.duration())
            },
            onend() {
                soundPause()
            },
        });


        function music_data() {
            times = setInterval(() => {
                value.value = Math.ceil(sound.seek())
            }, 1000)
        }

        // 启动播放
        function soundPlay() {
            sound.play()
            music_data()
            state.value = true
        }

        // 停止播放
        function soundPause() {
            sound.pause()
            clearInterval(times)
            state.value = false
        }


        function start() {
            soundPause()

        }

        function end() {
            soundPlay()
        }

        function setTime(e) {
            sound.seek(e)
        }

        function fn() {
            setTimeout(() => {
                soundPlay()
                window.removeEventListener('touchstart', fn, true)
            })
        }

        if (props.setData) {
            window.addEventListener('touchstart', fn, true);
        }
        onBeforeUnmount(() => {
            soundPause()
        })

        return {
            value,
            maxvalue,
            start,
            setTime,
            state,
            end
        };
    }
}
</script>

<style scoped>
.magin_box {
    width: 50%;
}

.box_da {

}

.box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0077aa;
    padding: 10px;
    border-radius: 10px
}

.slider {
    flex: 1;
    margin: 0 10px;
}

.time {
    font-size: 14px;
}
</style>