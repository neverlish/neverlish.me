---
title: "Bluebird, Promise의 파랑새"
date: "2023-05-07"
tags: ["Javascript", "Promise"]
---

Promise를 강력하고 편하게.

<!-- end -->

# Bluebird 란?

Javascript 에서 비동기 처리를 위해 [Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 사용한다. 하지만 Promise에서 제공하는 api는 한정적이다.

비동기 처리를 위한 여러 방법 중, 다양한 api를 제공하는 [Bluebird](https://github.com/petkaantonov/bluebird)라는 api가 있다.

Bluebird 는 아래의 디자인 원칙을 기반으로 설계되었다.
(http://bluebirdjs.com/docs/why-bluebird.html)

- 이론적이지 않고, 실용적
- 과장 없이 완전한 기능 제공
- 디버깅 용이
- 성급하지 않은 추상화
- 모든 곳에서 실행
- 사용 호환성

# api

Bluebird 에서는 Promise를 사용하기 편하도록 여러 api를 제공한다. 대표적으로,

- map
- reduce
- filter
- each
- mapSeries
- all

등이 있다. Bluebird 에서 제공하는 api들은 http://bluebirdjs.com/docs/api-reference.html 에서 확인할 수 있다.

# concurrency

Bluebird를 이용해 Promise를 병렬처리 시, Bluebird에서 제공하는 옵션 중 concurrency 옵션을 이용해 동시병렬을 설정할 수 있다.
