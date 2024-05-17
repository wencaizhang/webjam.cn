import defaultIcon from '~public/icons/stack/code.svg';
import gitlab from '~public/icons/stack/gitlab.svg';
import lerna from '~public/icons/stack/lerna.svg';
import prisma from '~public/icons/stack/prisma.svg';
import ts from '~public/icons/stack/ts.svg';

import Pinia from '~public/icons/stack/Pinia.svg';
import css3 from '~public/icons/stack/css3.svg';
import go from '~public/icons/stack/go.svg';
import less from '~public/icons/stack/less.svg';
import ps from '~public/icons/stack/ps.svg';
import vant from '~public/icons/stack/vant.png';

import actionvue from '~public/icons/stack/actionvue.png';
import golang from '~public/icons/stack/golang.svg';
import mysql from '~public/icons/stack/mysql.svg';
import psv from '~public/icons/stack/psv.png';
import vim from '~public/icons/stack/vim.svg';

import angular from '~public/icons/stack/angular.svg';
import docker from '~public/icons/stack/docker.svg';
import html from '~public/icons/stack/html.svg';
import nestjs from '~public/icons/stack/nestjs.svg';
import python from '~public/icons/stack/python.svg';
import vite from '~public/icons/stack/vite.svg';

import antdv from '~public/icons/stack/antdv.png';
import eleplus from '~public/icons/stack/ele+.png';
import nextjs from '~public/icons/stack/nextjs.svg';
import raspberrypi from '~public/icons/stack/raspberry-pi.svg';
import vscode from '~public/icons/stack/vscode.svg';

import axios from '~public/icons/stack/axios.webp';
import ele from '~public/icons/stack/ele.png';
import java from '~public/icons/stack/java.svg';
import nginx from '~public/icons/stack/nginx.svg';
import reactnative from '~public/icons/stack/react-native.svg';
import vue from '~public/icons/stack/vue.svg';

import babel from '~public/icons/stack/babel.svg';
import es from '~public/icons/stack/es.svg';
import nodejs from '~public/icons/stack/nodejs.svg';
import react from '~public/icons/stack/react.svg';
import webpack from '~public/icons/stack/webpack.svg';

import caddy from '~public/icons/stack/caddy.png';
import firefox from '~public/icons/stack/firefox.svg';
import jenkins from '~public/icons/stack/jenkins.svg';
import npm from '~public/icons/stack/npm.svg';
import sass from '~public/icons/stack/sass.svg';
import wordpress from '~public/icons/stack/wordpress.svg';

import chrome from '~public/icons/stack/chrome.svg';
import flutter from '~public/icons/stack/flutter.svg';
import js from '~public/icons/stack/javascript.svg';
import php from '~public/icons/stack/php.svg';
import shopify from '~public/icons/stack/shopify.svg';
import yarn from '~public/icons/stack/yarn.svg';

import git from '~public/icons/stack/git.svg';
import k8s from '~public/icons/stack/k8s.svg';
import postcss from '~public/icons/stack/postcss.svg';
import tailwindcss from '~public/icons/stack/tailwind-css.svg';
import terminal from '~public/icons/stack/terminal.svg';

export const StackIconsMap = {
  defaultIcon,
  gitlab,
  lerna,
  prisma,
  ts,

  Pinia,
  css3,
  go,
  less,
  ps,
  vant,

  actionvue,
  golang,
  mysql,
  psv,
  vim,

  angular,
  docker,
  html,
  nestjs,
  python,
  vite,

  antdv,
  eleplus,
  nextjs,
  raspberrypi,
  vscode,

  axios,
  ele,
  java,
  nginx,
  reactnative,
  vue,

  babel,
  es,
  nodejs,
  react,
  webpack,

  caddy,
  firefox,
  jenkins,
  npm,
  sass,
  wordpress,

  chrome,
  flutter,
  js,
  php,
  shopify,
  yarn,

  git,
  k8s,
  postcss,
  tailwindcss,
  terminal,
};

export function BrandIcon(props: {
  type: keyof typeof StackIconsMap;
  className?: string;
}) {
  const { type, className } = props;
  const Icon = StackIconsMap[type] || defaultIcon;
  if (!Icon) return <div>Missing icon for {type}</div>;

  return (
    <div
      className={className || 'h-16 w-16 lg:h-14 lg:w-14 xl:h-20 xl:w-20'}
      style={{
        backgroundImage: `url(${Icon.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    />
  );
}
