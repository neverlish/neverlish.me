---
title: "elastic의 analyzer"
date: "2023-07-02"
tags: ["elasticsearch", "분석기", "analyze"]
---

elasticsearch의 분석기에 대한 설명

<!-- end -->

# Problem

앱에서 검색기능을 사용하는 입장에서는 아무렇게나 검색해도, 검색어를 자동으로 분석해서 검색해주기를 기대한다.
예를 들어, "사과나무" 라고 검색하면, "사과" 의 검색결과와 "나무"의 검색결과가 함께 포함되기를 기대하는 것이다.

사용자가 편리한 기능은, 반대로 구현자의 입장에서는 구현하기가 어렵다.
위 케이스는, 아래와 같이 구분해서 구현해야 한다.

1. "사과나무"라는 검색어가 들어오면, "사과" / "나무" / "사과나무" 3가지의 단어로 구분할 수 있어야 한다.
2. 검색결과에서 "사과" 의 검색결과와 "나무"의 검색결과를 포함한다. 이를 위한 방법으로는 두 가지를 생각할 수 있다. mysql의 질의를 예로 들면

- a.
  아래처럼 or 연산자를 이용해 2개의 like 검색을 묶는다.

  ```sql
  select * from TABLE
  WHERE value like "%사과%" OR value like "%나무%";
  ```

- b.
  아래 쿼리를 두 번 한후, application 단에서 조합한다.

  ```sql
  select * from TABLE
  WHERE value like "%사과%";

  select * from TABLE
  WHERE value like "%나무%";
  ```

2개의 방식은 아래와 같은 문제가 있다.

- like 검색과 or 연산자 모두 각각이 db에 부하를 일으킬 수 있는데, 두 개를 결합하면 db에 더 큰 부하가 갈 것

# Why Elasticsearch

검색 기능을 위해서 흔히 채택하는 도구가 elasticsearch(이하 es) 이다.
es에서는 검색기능을 위해 다양한 편의기능을 제공한다.
이 문서에서는, 아래 2개 기능에 대해 설명한다.

- 역 인덱스
- 분석기

위 2개의 수단을 이용해, 문제 상황을 해결하기 위한 구현을 쉽게 할 수 있다.

# 역 인덱스

mysql에서는 어떠한 단어가 포함되는 건들을 조회하기 위해 like 검색을 사용한다.
like 검색은 db에 부하를 일으킬 수 있어, 가능하다면 대용량 서비스일 수록 기피해야 하는 기능이다.

es 에서는, "어떠한 단어가 포함되는 건들의 조회"를 빠르게 하기 위해, 역인덱스 구조를 채택하고 있다.
역 인덱스란, 어떠한 단어가 포함되는 id들을 별도로 저장하는 것이다.

<img src="https://1535112035-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-Ln04DaYZaDjdiR_ZsKo%2F-LntL_BGpuFbNXy_sFtK%2F-LntLbibpXHABupWvXtu%2F6.1-03.png?alt=media&token=d2726f20-a7ea-4219-bcb0-340cbe1d21f1">

단어에 해당하는 문서들이 증가해도 es의 역인덱스에만 추가하면 되기 때문에, 추가 및 조회 시에 부담이 적다.
이를 통해 검색질의조건에 해당하는 문서들을 빠르게 접근할 수 있다.

문서를 역인덱스에 추가하는 것을 "색인"이라 한다.

# 분석기

elasticsearch 에서는 문서에 문자열 필드를 저장할 때, 분석기를 거쳐 저장할 수 있다.

필터를 거치는 것처럼, 문자열 필드의 값이 정제되어 역인덱스에 저장되는 것이다.

- 대문자를 소문자로 변환
- 공백을 제거
- 명사를 동사로 변환

등의 분석기가 기본적으로 제공되고 있다. 사용자가 별도로 분석기를 만들어서 정의할 수도 있다.

<img src="https://1535112035-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-Ln04DaYZaDjdiR_ZsKo%2F-LntYrdKmTe441TqYAJl%2F-LntZ63SAIfHu6Q_OgzJ%2F6.2-02.png?alt=media&token=52213afe-e6ab-4bc2-b9e0-20027542a79e">

# 한글 형태소 분석기

한글 필드를 저장할 때 형태소 별로 분석하여 저장하고자 하는 경우가 많다. 이를 위한 대표적인 분석기로, [은전한닢](https://bitbucket.org/eunjeon/seunjeon/src/master/) 이 있다.

## 예시 코드

아래 형태의 문서가 색인된다고 가정한다.

```json
{
  "title": "문자열",
  "description": "문자열"
}
```

은전한닢을 사용하기 위한 예시 코드는 아래와 같다.

### 인덱스 생성

```json
PUT INDEX_NAME
{
  "settings": {
    "analysis": {
      "tokenizer" : {
        "seunjeon" : {
          "type" : "seunjeon_tokenizer"
        }
      },
      "analyzer" : {
        "my_custom_analyzer" : {
          "type" : "custom",
          "tokenizer" : "seunjeon"
        }
      }
    }
  }
}
```

### 인덱스에 칼럼 매핑

```
PUT INDEX_NAME/_mappings
{
  "properties" : {
    "title" : {"type" : "text", "analyzer" : "my_custom_analyzer"},
    "description" : {"type" : "text", "analyzer" : "my_custom_analyzer"}
  }
}
```

## 문서 색인 및 검색

elasticsearch의 문서 추가 api를 통해 문서를 추가하면, 역인덱스에 분석기를 거친 상태로 검색이 된다.

## analyzer 시험

분석기가 의도한 대로 잘 분석되는지 확인하기 위해, 아래 api를 사용할 수 있다.

```json
GET INDEX_NAME/_analyze
{
  "text": "VALUE",
  "analyzer": "my_custom_analyzer"
}
```

# References

- https://esbook.kimjmin.net/06-text-analysis/6.1-indexing-data
