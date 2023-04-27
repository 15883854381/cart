<template>
    <div class="Shuttle_box" @click="showTag">
        <div class="Shuttle_box_left">
            <span class="Shuttle_box_font van-field__label ">用户标签</span>
            <div class="Shuttle_box_input">
                <div class="Shuttle_box_input_tags">
                    <template v-if="Selected_list.length">
                        <van-tag @click.stop="closeTag(item,index)" :key="item.id" v-for="(item,index) in Selected_list"
                                 closeable size="medium"
                                 type="primary">{{ item.text }}
                        </van-tag>
                    </template>
                    <small v-else class="please">请选择用户标签</small>
                </div>
            </div>
            <div class="Shuttle_box_icon">
                <van-icon name="arrow"/>
            </div>
        </div>
    </div>
  <!--    <div class="tags_box van-cell" v-if="tags_list.length">-->
  <!--        <span class="van-field__label Shuttle_box_font">推荐标签：</span>-->
  <!--        <van-tag @click="Tag_item(item,index)" :key="item.id+ new Date().getTime()" v-for="(item,index) in tags_list" size="medium"-->
  <!--                 type="primary">{{ item.text }}{{item.id}}-->
  <!--        </van-tag>-->
  <!--    </div>-->


    <van-popup closeable v-model:show="show" round position="bottom">
        <div class="closeable" ></div>
        <van-tree-select
                @click-item="SelectedTags"
                v-model:active-id="activeId"
                v-model:main-active-index="activeIndex"
                :items="userTag_items"/>
    </van-popup>


</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {userTags} from "@/api/utils";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Shuttle",
    emits: ['getSelectTtag'],
    setup(props,context) {
        let tags = ref(false)
        let Selected_list = reactive([])
        const activeId = ref([]);
        const activeIndex = ref(0);
        let show = ref(false);
        let userTag_items = ref([
            {
                text: '新车',
                children: [
                    {text: '保时捷', id: 1},
                    {text: '宝马', id: 2},
                    {text: '兰博基尼', id: 3},
                ],
            },
            {
                text: '二手车',
                children: [
                    {text: '五零宏光', id: 4},
                    {text: '全款购买', id: 5},
                    {text: '分期购买', id: 6},
                ],
            },
        ]);

        function showTag() {
            show.value = true
        }


        // 从选中列表中 删除 选中的数据
        function closeTag(e) {
            let re_tags = activeId.value.findIndex(item => item === e.id)
            activeId.value.pop(re_tags)
            Selected_list.shift(e)
            context.emit('getSelectTtag',Selected_list)
        }

        // 选中时添加 tags 否则 删除
        function SelectedTags(e) {
            let re_tags = activeId.value.find(item => item === e.id)
            re_tags === undefined ? Selected_list.shift(e) : Selected_list.unshift(e);
            context.emit('getSelectTtag',Selected_list)
        }

        onMounted(() => {
            userTags().then(res => {
                console.log(res)
                userTag_items.value = res.data.data
            })
        })


        return {
            tags,
            Selected_list,
            userTag_items,
            activeId,
            activeIndex,
            show,
            showTag,
            closeTag,
            SelectedTags
        }
    }
}
</script>

<style scoped lang="scss">
.Shuttle_box_left {
  display: flex;
  align-items: center;
}

.Shuttle_box_font {
  color: #323233;
  font-size: 14px;
  //padding: 0 14px;
  margin-right: 12px;
}

.Shuttle_box_input {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  flex: 1;

  .van-tag {
    margin-right: 5px;
  }
}

.Shuttle_box_icon {
  font-size: 18px;
  color: #969799;
}

.Shuttle_box {
  border-bottom: 1px solid #F5F6F7;
  padding: 10px 16px;
}

.tags_box {
  .van-tag {
    margin-right: 5px;
  }
}

.please {
  font-size: 14px;
  color: #C8C9D6;
}
.closeable{
    height: 35px;
}

</style>