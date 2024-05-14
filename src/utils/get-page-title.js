import systemConfig from '@/system.config'

const title = systemConfig.name || '暮手记'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}
