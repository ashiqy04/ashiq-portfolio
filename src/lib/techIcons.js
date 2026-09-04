import { DiJava } from 'react-icons/di'
import {
  SiSpringboot, SiPostgresql, SiMysql, SiReact, SiJavascript, SiHtml5, SiCss,
  SiKotlin, SiAndroid, SiFirebase, SiGoogleplay, SiGit, SiDocker, SiNodedotjs,
  SiMongodb, SiTypescript, SiRedis,
} from 'react-icons/si'
import { Code2 } from 'lucide-react'

// Keys are normalized (lowercased, non-alphanumeric stripped) so "Spring Boot",
// "spring-boot", and "SpringBoot" all resolve the same way.
const ICON_MAP = {
  java: DiJava,
  springboot: SiSpringboot,
  spring: SiSpringboot,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  react: SiReact,
  javascript: SiJavascript,
  js: SiJavascript,
  html5: SiHtml5,
  html: SiHtml5,
  htmlcss: SiHtml5,
  css: SiCss,
  css3: SiCss,
  kotlin: SiKotlin,
  android: SiAndroid,
  androidsdk: SiAndroid,
  firebase: SiFirebase,
  playstore: SiGoogleplay,
  googleplay: SiGoogleplay,
  git: SiGit,
  docker: SiDocker,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  typescript: SiTypescript,
  ts: SiTypescript,
  redis: SiRedis,
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Returns a component to render — either the matched brand icon or a generic
// fallback, so unrecognized tags (typos, niche tools) never break the layout.
export function getTechIcon(tagText) {
  return ICON_MAP[normalize(tagText || '')] || Code2
}
