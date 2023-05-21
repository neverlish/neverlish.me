---
title: "node.js 에서 opensearch 사용하기"
date: "2023-05-21"
tags: ["opensearch"]
---

node.js 에서 aws opensearch 를 도입해보자.

<!-- end -->

검색엔진 구현을 위해 흔히 elasticsearch 를 많이 사용한다. aws 에서 서비스를 운영중이라면, aws의 managed search engine인 opensearch 도입을 검토해볼 만하다.

- [opensearch가 무엇인가](https://aws.amazon.com/ko/what-is/opensearch/)

이 글에서는 아래에 대해 설명한다.

- node.js 에서 opensearch 도입을 위해 필요한 기본적인 방법
- opensearch sdk 의 주요 명령어들

이 글에서 아래 내용은 설명하지 않는다.

- opensearch가 무엇인지
- 검색엔진 관리를 위해 필요한 여러가지 개념

# aws에 opensearch 생성

1. aws 콘솔에 로그인 후, amazon opensearch service 에 진입한다.
   (https://console.aws.amazon.com/aos/home)

2. '도메인 생성' 버튼을 클릭한다.

3. 각자 필요한 값을 입력한 후, 도메인을 생성한다.

   - 프리티어를 사용하고 싶은 경우, 아래와 같은 설정을 적용하면 된다.
     - 도메인 생성 방법: 사용자 지정 생성
     - 템플릿: 개발 및 테스트
     - Deployment Option(s): 대기 없는 도메인
     - 인스턴스 유형: T3
   - 이 문서에서는 실습을 위해, '세분화된 액세스 제어' 항목에서, '마스터 사용자 생성' 옵션을 선택한다.
     - 이 때 입력한 마스터 사용자 이름, 마스터 암호를 기억해두자.
   - 생성시 15분 정도의 시간이 소요된다.

4. 서비스 생성이 완료되면, 우상단에 보이는 호스트/대시보드 주소를 기억하자.

# opensearch npm를 이용한 코드 작업

## client 초기화

클라이언트 초기화를 위해서는 아래와 같은 코드를 사용한다.

```ts
import { Client } from "@opensearch-project/opensearch";
import fs from "fs";
const host = "localhost";
const protocol = "https";
const auth = "{마스터사용자이름}:{마스터암호}"; // 앞에서 직접 입력한 마스터 정보
const ca_certs_path = "{pem경로}";

const client = new Client({
  node: protocol + "https://" + auth + "@" + host + ":" + port,
  ssl: {
    ca: fs.readFileSync(ca_certs_path),
  },
});
```

## 인덱스 생성

rbdms의 database와 비슷한 개념을, elastic/opensearch 에서는 인덱스라고 한다.
인덱스는 검색엔진의 문서를 저장하는 공간이 된다.

```ts
const index_name = "books";

const response = await client.indices.create({
  index: index_name,
});

console.log(response.body);
```

## 문서 추가

opensearch에서 문서는 데이터가 저장되는 최소 단위이다. 일반적으로 json 형태로 저장한다.

```ts
const document = {
  title: "The Outsider",
  author: "Stephen King",
  year: "2018",
  genre: "Crime fiction",
};

const id = "1";

const response = await client.index({
  id: id,
  index: index_name,
  body: document,
  refresh: true,
});

console.log(response.body);
```

## 문서 검색

문서를 검색시에는 인덱스명과 검색조건이 필요하다.

```ts
const query = {
  query: {
    match: {
      title: {
        query: "The Outsider",
      },
    },
  },
};

const response = await client.search({
  index: index_name,
  body: query,
});

console.log(response.body.hits);
```

opensearch 의 질의를 위한 여러가지 조건, 명령어는 https://opensearch.org/docs/latest/search-plugins/searching-data/index/ 를 참고하여 코드를 작성할 수 있다.

# dashboard

elasticsearch의 kibana처럼 opensearch 의 결과를 opensearch dashboard를 통해 시각적으로 확인할 수 있다. 실제 키바나와 외양이나 사용법이 거의 비슷하다.

## 접속 방법

- aws 콘솔에서 도메인 생성 후 확인한 대시보드 링크를 클릭
- 마스터 접속정보를 입력 후 대시보드 진입

# 후기

- elasticsearch npm을 사용해본 적이 있는데, 이와 opensearch npm의 api 설계가 거의 비슷하다는 생각이 들었다. elasticsearch를 사용해본 적이 없다면 무리 없이 사용할 수 있을 것으로 보인다.
- 라이브러리 자체에서 typescript 지원을 잘 해주고 있어, typescript 관련 별다른 설정을 하지 않아도 되어서 좋았다.
- opensearch는 aws에서 관리해주는 이점이 있을 것이라 짐작했는데, elasticsearch와의 차이점은 실제로 더 서비스를 운영해보고 여러 삽질과 문제해결을 겪으며 느껴봐야 할 것 같다.
- opensearch 의 아주 기본적인 세팅을 마무리했다. 이제 여러 문서들을 찾아보며, opensearch 를 적극적으로 사용해보자.

# References

- [라이브러리 사용자 가이드: 예시문서](https://github.com/opensearch-project/opensearch-js/blob/main/USER_GUIDE.md)
- [opensearch dashboard 사용자 가이드](https://opensearch.org/docs/latest/dashboards/quickstart/)
