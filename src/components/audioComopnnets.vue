<template>


    <div style="width: 92%" class="box_da">
        <div class="box">
            <div>
                <van-icon size="25" @click="start" v-if="state" name="pause-circle-o"/>
                <van-icon size="25" @click="end" v-else name="play-circle-o"/>
            </div>
            <div class="slider">
                <van-slider @change="setTime" bar-height="10px" button-size="10px" v-model="value" :max="maxvalue"/>
            </div>
            <div class="time">
                <span>{{ value }} / {{ maxvalue }}s</span>
            </div>
        </div>
    </div>


</template>

<script>
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {Howl} from "howler";

export default {
    props: {
        setData: {
            type: Boolean,
            default: false,
        },
        src: {
            type: String,
            default: 'https://hxyrecord.oss-cn-beijing.aliyuncs.com/haoxiaoyun/2023-06-14/4a42e7c6fe96a9779d76589c9999d644.wav',
        }
    },
    setup(props) {
        let value = ref(0)
        let maxvalue = ref(0)
        let state = ref(false);
        let times = null;
        let sound = reactive({});


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
        onMounted(() => {
            sound = new Howl({
                src: props.src,
                html5: true,
                onload: function () {
                    maxvalue.value = parseInt(sound.duration())
                },
                onend() {
                    soundPause()
                },
            })
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