# Portfolio (GitHub Pages)

이 저장소는 정적 포트폴리오 페이지입니다. 화면에 표시되는 대부분의 텍스트는 `data/portfolio.json`에서 불러옵니다.

## 데이터 수정 방법

### `data/portfolio.json`

`script.js`가 `./data/portfolio.json`을 `fetch`해서 렌더링합니다.

#### 최상위 구조

- **`hero`**: 첫 화면(헤더) 정보
- **`intro`**: 소개 문단 + 숫자/지표 카드
- **`experience`**: 경력 타임라인
- **`projects`**: 프로젝트 카드 목록
- **`skills`**: 스킬 그룹(2열 카드)
- **`presentation`**: 발표/세미나 리스트
- **`article`**: 아티클(작성/발행) 리스트
- **`openSource`**: 오픈소스 활동 리스트
- **`education`**: 학력/자격 리스트
- **`etc`**: 기타 항목 리스트
- **`footerName`**: 푸터에 표시되는 이름

#### 필드별 작성 가이드

##### `hero`

```json
{
  "hero": {
    "role": "직무/타이틀",
    "name": "이름",
    "tagline": "한 줄 소개",
    "contacts": [
      { "label": "Email", "value": "메일주소", "url": "mailto:..." },
      { "label": "GitHub", "value": "github.com/...", "url": "https://..." }
    ]
  }
}
```

- **`role`**: 상단 작은 라벨(예: `INFRA / CLOUD ENGINEER`)
- **`name`**: 메인 H1 이름
- **`tagline`**: 이름 아래 한 줄 설명
- **`contacts[]`**: 연락처 목록
  - **`label`**: 아이콘 자동 선택에 사용(Email/GitHub/LinkedIn은 전용 아이콘)
  - **`value`**: 화면에 보이는 텍스트
  - **`url`**: 클릭 시 이동할 링크
    - 이메일은 `mailto:someone@example.com`
    - 웹/깃허브/링크드인은 `https://...`

##### `intro`

```json
{
  "intro": {
    "text": "소개 문단(긴 텍스트 가능)",
    "stats": [
      { "value": "99.95%", "label": "서비스 가용성 목표 달성" },
      { "value": "40%", "label": "인프라 비용 최적화" },
      { "value": "60%", "label": "평균 장애 복구 시간 단축" },
      { "value": "300+", "label": "배포 자동화 파이프라인 운영" }
    ]
  }
}
```

- **`text`**: 소개 문단
- **`stats[]`**: 4개 정도를 추천(모바일에서는 1열로 내려갑니다)
  - **`value`**: 큰 숫자/비율
  - **`label`**: 설명 문구

##### `experience[]`

```json
{
  "experience": [
    {
      "period": "2023.01 ~ 현재",
      "title": "직함 · 회사",
      "items": ["성과/역할 1", "성과/역할 2"]
    }
  ]
}
```

- **`period`**: 기간
- **`title`**: 한 줄 타이틀
- **`items[]`**: 불릿 리스트(구체적인 수치/효과를 넣으면 좋습니다)

##### `projects[]`

```json
{
  "projects": [
    {
      "title": "프로젝트명",
      "description": "무엇을/왜 했는지 1~2문장",
      "highlights": ["핵심 성과 1", "핵심 성과 2"]
    }
  ]
}
```

- **`title`**: 카드 제목
- **`description`**: 카드 설명
- **`highlights[]`**: 불릿(성과 중심 권장)

##### `skills[]`

```json
{
  "skills": [
    { "group": "Cloud & Infra", "items": "AWS, GCP, Kubernetes, Docker" }
  ]
}
```

- **`group`**: 그룹 제목
- **`items`**: 쉼표로 나열된 한 줄 텍스트(현재 구현은 문자열 1개로 표시)

##### `presentation[]`

```json
{
  "presentation": [
    { "year": "2025", "title": "발표 제목" }
  ]
}
```

##### 문자열 리스트 섹션들

아래 섹션들은 **문자열 배열**로 작성합니다.

```json
{
  "article": ["글 제목 1", "글 제목 2"],
  "openSource": ["활동 1", "활동 2"],
  "education": ["학력/자격 1", "학력/자격 2"],
  "etc": ["기타 1", "기타 2"]
}
```

##### `etc` (기타 활동: 날짜 + 내용)

`etc`는 아래 두 형태를 모두 지원합니다.

- **문자열 배열(기존 방식)**:

```json
{
  "etc": ["기타 1", "기타 2"]
}
```

- **객체 배열(추천: 날짜 포함)**:

```json
{
  "etc": [
    { "date": "2026", "text": "사내 기술 세미나 분기별 운영" },
    { "date": "2025.11", "text": "클라우드 아키텍처 리뷰 멘토링" }
  ]
}
```

- **`date`**: 화면에서 굵게 표시되는 날짜/기간(예: `2026`, `2025.11`, `2024.03~2024.06`)
- **`text`**: 활동 내용(문장/불릿 1개)

##### `footerName`

```json
{ "footerName": "홍길동" }
```

## 이미지/아이콘 수정

- **프로필 이미지**: `assets/profile/MyProfile.png`
  - 교체 시 파일명/경로를 유지하면 코드 수정 없이 반영됩니다.
- **테마/다운로드 버튼 아이콘**: `assets/icons/` 아래 SVG들
  - `script.js`에서 라이트/다크에 따라 아이콘 파일을 바꿔 끼웁니다.

# llokr1.github.io
My portfolio webpage
