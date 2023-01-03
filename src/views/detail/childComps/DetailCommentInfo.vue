<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-title">
      <span>用户评价</span>
      <span>更多</span>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span class="user-name">{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-comment">
      <span>{{ commentInfo.content }}</span>
    </div>

    <div class="info-message">
      <span style="margin-right: 10px">{{ commentInfo.created | showData }}</span>
      <span>{{ commentInfo.style }}</span>
    </div>

    <div class="info-image" v-if="commentInfo.images">
      <img :key="index" v-for="(img, index) in commentInfo.images" :src="img" alt="" />
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";

export default {
  name: "DetailCommentInfo",
  filters: {
    showData(value) {
      // 1. 时间戳转Date对象
      const date = new Date(value * 1000);
      // 2. 将data进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    },
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.comment-info {
  font-size: 15px;
  padding: 20px 15px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-user img {
  width: 40px;
  border-radius: 50%;
  margin-top: 10px;
}
.info-user span {
  position: relative;
  top: -15px;
  left: 10px;
}
.info-comment {
  margin-top: 10px;
}
.info-comment span {
  line-height: 1.5;
  font-size: 14px;
}
.info-message {
  margin-top: 10px;
  font-size: 10px;
  color: #a3a3a5;
}
.info-image img {
  width: 25%;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
