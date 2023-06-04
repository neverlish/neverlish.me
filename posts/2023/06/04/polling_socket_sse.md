---
title: "HTTP의 비연결성과 해결 방안"
date: "2023-06-04"
tags: ["HTTP 비연결성", "폴링", "롱 폴링", "소켓", "Server Sent Event"]
---

HTTP Protocol의 비연결성의 한계와, 이를 해결하기 위한 방안을 알아본다.

<!-- end -->

HTTP 프로토콜은 아래와 같은 과정을 거쳐 통신한다.

- 클라이언트가 서버에 요청을 보내면
- 서버는 클라이언트에 요청에 대한 응답을 보낸다.
- 서버가 응답을 주고 나면, 클라이언트와 서버 사이의 TCP/IP 연결은 끊어진다.

한번 요청-응답 통신을 하고 나면 연결이 끊어지는데, 이를 'HTTP의 비연결성' 이라 한다.

최근의 여러 서비스/애플리케이션은 1회성 요청/응답만으로는 구현하기 어려운 여러가지 실시간 기능을 가지고 있다. 예를 들어,

- 앱 서비스의 알림수 확인
- 채팅
- 푸시 알림

등은, 사용자가 앱을 실행하둔 상태에서 지속적으로 최신화되어 바뀐 정보를 사용자에게 제공해야 한다.

HTTP 프로토콜은 비연결성 특징을 가지고 있어서, HTTP 프로토콜 만으로는 실시간 통신을 구현하는 것이 쉽지 않다.
이를 해결하기 위한 몇 가지 방안이 있다.

- Polling
- Long Polling
- Web Socket
- Server Sent Event

# Polling

폴링 방식은 아래와 같은 과정을 거쳐 동작한다.

- 클라이언트는 일정 주기로 서버에 데이터를 요청한다.
- 서버는 들어온 요청을 받을 때마다 그 당시의 데이터를 기반으로 응답값을 전달한다.

폴링 방식은 아래와 같은 단점을 가진다.

- 폴링 방식은 서비스 규모가 작은 경우에는 괜찮지만, 서비스 규모가 점점 커질 경우 서버에 부담을 주게 된다. 데이터에 변경이 있는 지를 모르고 계속해서 클라이언트가 요청하기 때문이다.
- 완전 실시간성을 보장하지 않는다. 데이터가 변경된 시점과 클라이언트가 요청을 보내는 시점이 일치하지 않기 때문이다.

<img src="https://junhyunny.github.io/images/polling-long-polling-and-spring-example-1.JPG">
(출처: https://junhyunny.github.io/information/spring-boot/polling-long-polling-and-spring-example/)

# Long Polling

롱폴링 방식은 폴링방식의 단점을 해결하기 위해 나온 방식이다.
롱폴링 방식은 아래와 같은 과정을 거쳐 동작한다.

- 클라이언트는 요청을 한다.
- 서버는 요청이 들어올 경우 바로 응답을 하지 않고 일정시간 대기한다. 대기시간 중에 특정 이벤트가 발생하면 바로 응답을 주고, 그렇지 않다면 일정 대기시간 이후 응답을 한다.
- 응답 이후 연결이 끊기면 클라이언트는 서버에 다시 요청을 한다. 이 과정을 계속 반복한다.

롱폴링은 데이터 변경 시점과 응답시점이 일치하기 때문에, 실시간성을 보장한다.

이 방식은 데이터가 자주 변경되지 않는 경우에는 적합한 방식이다. 서버-클라이언트간의 통신 수가 적기 때문이다.
하지만, 데이터 변경이 잦은 경우에는 서버에 과부하가 생겨 부담을 주게 된다.

<img src="https://t1.daumcdn.net/cfile/tistory/99A9F74C5C28BF1A2A">

# Web Socket

단방향성, 비연결성 특징을 가친 HTTP 프로토콜은 실시간 통신에 적합하지 않은 프로토콜이다.
웹소켓은 실시간 통신을 위해 고안된 프로토콜이다.

웹소켓은 아래와 같은 과정을 거쳐 동작한다.

- 클라이언트와 서버간의 첫 연결은 http 통신을 통해 맺어진다.
- 연결이 이루어지면, 서버와 클라이언트 간에 웹소켓 연결이 형성된다. http 연결은 특정시간 이후 끊어진다.

웹소켓은 실시간성을 보장하고, 양방향 통신을 한다는 장점이 있다.
하지만 아래와 같은 단점을 가진다.

- 연결 생성 및 대응을 위한 코드 구현이 복잡
- 서버와 클라이언트 간의 연결 자체가 비용

# Server-Sent Events(SSE)

SSE는 HTML5를 통해 새로 제안된 규약이다.

SSE 는 서버와 클라이언트 사이에 단방향 채널을 연다.
서버는 이벤트를 발행하고, 클라이언트는 구독한다. 서버에서는 변경사항이 있을 때마다 클라이언트에 전송하는 것이다.

단방향으로 전송되어 있기 때문에, 클라이언트-서버의 양방향 통신이 필요한 경우(예: 채팅) 에는 부적합할 수 있다.

# References

- https://junhyunny.github.io/information/spring-boot/polling-long-polling-and-spring-example/
- https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events
- https://ko.javascript.info/long-polling
- https://kamang-it.tistory.com/entry/Webhttp%ED%86%B5%EC%8B%A0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%96%91%EB%B0%A9%ED%96%A5-%ED%86%B5%EC%8B%A0%EA%B8%B0%EB%B2%95-long-polling
- https://choseongho93.tistory.com/266
