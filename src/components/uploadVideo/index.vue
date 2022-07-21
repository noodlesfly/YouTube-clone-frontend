<!-- src\components\UploadVideo\index.vue -->
<template>
  <div class="sc-AxiKw dZbDOR">
    <div class="modal-content">
      <form @submit.prevent="handleSave">
        <div class="modal-header">
          <div class="modal-header-left">
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              @click="handleClose"
            >
              <g>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                ></path>
              </g>
            </svg>
            <h3>Upload Video</h3>
          </div>
          <div style="display: block">
            <button class="sc-AxirZ erzyjX" :disabled="isUploading">Save</button>
          </div>
        </div>
        <div class="tab video-form">
          <input required type="file" ref="file" @change="handleFileChange" />
          <video ref="videofile" controls></video>
          <input required v-model="video.title" type="text" placeholder="Enter the title" />
          <textarea
          v-model="video.description"
            required
            placeholder="Tell viewers about your video"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { nextTick, reactive, ref } from 'vue'
import { createUploadVideo, refreshUploadVideo } from '@/service/vod'
import { createVideo } from '@/service/video'
import nprogress from 'nprogress'
import { useRouter } from 'vue-router'

interface EmitTypes {
    (e: 'close-upload'): void
}

const file = ref<HTMLInputElement | null>(null)
const videofile = ref<HTMLVideoElement | null>(null)
const router = useRouter()

const handleFileChange = async () => {
  await nextTick()
  const fileObj = (file.value?.files as any)[0];
  (videofile.value as any).src = URL.createObjectURL(fileObj)
}

const video = reactive({
  title: '',
  description: '',
  cover: 'sssssscscsccsdcsdccscs',
  vodVideoId: ''
})
const isUploading = ref(false)

const emit = defineEmits<EmitTypes>()
const handleClose = () => {
  emit('close-upload')
}
const createUploader = () => {
  const uploader = new window.AliyunUpload.Vod({
    // userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
    userId: '122',
    // 上传到视频点播的地域，默认值为'cn-shanghai'，
    // eu-central-1，ap-southeast-1
    region: '',
    // 分片大小默认1 MB，不能小于100 KB（100*1024）
    partSize: 1048576,
    // 并行上传分片个数，默认5
    parallel: 5,
    // 网络原因失败时，重新上传次数，默认为3
    retryCount: 3,
    // 网络原因失败时，重新上传间隔时间，默认为2秒
    retryDuration: 2,
    // 开始上传
    onUploadstarted: async function (uploadInfo:any) {
      if (uploadInfo.videoId) {
        const data = await refreshUploadVideo({
          VideoId: uploadInfo.videoId
        })
        const uploadAuth = data.UploadAuth
        const uploadAddress = data.UploadAddress
        const videoId = data.VideoId
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
      } else {
        const data = await createUploadVideo({
          Title: uploadInfo.file.name,
          FileName: uploadInfo.file.name
        })
        const uploadAuth = data.UploadAuth
        const uploadAddress = data.UploadAddress
        const videoId = data.VideoId
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
      }
    },
    // 文件上传成功
    onUploadSucceed: async function (uploadInfo:any) {
      video.vodVideoId = uploadInfo.videoId
      const videoInfo = await createVideo(video)
      console.log('success', videoInfo)
      nprogress.done()
      emit('close-upload')
      router.push({
        name: 'watch_index',
        params: {
          videoId: videoInfo.video._id
        }
      })
    },
    // 文件上传失败
    onUploadFailed: function (uploadInfo:any, code:any, message:any) {
      nprogress.done()
    },
    // 文件上传进度，单位：字节
    onUploadProgress: function (uploadInfo:any, totalSize:any, loadedPercent:any) {
      const percent = Math.floor(loadedPercent)
      console.log(percent)
      nprogress.inc(percent)
    },
    // 上传凭证或STS token超时
    onUploadTokenExpired: async function (uploadInfo:any) {
      const data = await refreshUploadVideo({
        VideoId: uploadInfo.videoId
      })
      const uploadAuth = data.UploadAuth
      uploader.resumeUploadWithAuth(uploadAuth)
    },
    // 全部文件上传结束
    onUploadEnd: function (uploadInfo:any) {
      isUploading.value = false
    }

  })
  return uploader
}

const handleSave = async () => {
  isUploading.value = true
  await nextTick()
  const uploader = createUploader()
  uploader.addFile((file.value?.files as any)[0], null, null, null, '{"Vod":{}}')
  uploader.startUpload()
  nprogress.start()
}
</script>
