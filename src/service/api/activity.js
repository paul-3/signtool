import axios from '../../config/axios'
import { activityUrl } from '@/config/env'
// const baseUrl = 'http://10.9.70.231:9999'

/**
 * 获取已报名列表
 * @param activityId
 * @returns {AxiosPromise}
 */
export function getSignedClientList (activityId) {
  return axios({
    url: activityUrl + 'financial/activityClient?activityId=' + activityId,
    method: 'get'
  })
}

/**
 * 查询活动详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getActivityDet (id) {
  return axios({
    url: activityUrl + 'financial/activity/' + id,
    method: 'get'
  })
}

/**
 * 理财师可见活动列表
 * @returns {AxiosPromise}
 */
export function getActivityList () {
  return axios({
    url: activityUrl + 'financial/activity',
    method: 'get'
  })
}

/**
 * 理财师logo
 */
export function getActivityLogo () {
  return axios({
    url: activityUrl + 'financial/activity/logo',
    method: 'get'
  })
}

export function signActivity (data) {
  return axios({
    url: activityUrl + 'financial/activityClient',
    data,
    method: 'post'
  })
}

/**
 * 获取报名客户信息
 * @param id: activityClientId
 * @returns {AxiosPromise}
 */
export function signedData (id) {
  return axios({
    url: activityUrl + 'financial/activityClient/' + id,
    method: 'get'
  })
}

/**
 * 理财师扫描客户二维码签到
 * @returns {AxiosPromise}
 */
export function qscan (link) {
  return axios({
    url: activityUrl + link,
    method: 'put'
  })
}
