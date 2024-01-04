# Remix ile Web Standartlarına Uygun Full-stack Geliştirme

## Nasıl çalıştırırım

0. [pnpm](https://pnpm.io) paket yöneticisini edinin

1. Bağımlılıkları yükleyin

```sh
pnpm install
```

2. Örnek veriyi veritabanına yükleyin

```sh
pnpm run seed
```

3. Geliştirme sunucusunu başlatın

```sh
pnpm run dev
```

4. Ekrana çıkan URL'yi (ör. [localhost:3000](http://localhost:3000)) tarayıcınızda açın

## Önemli dosyalar

- `package.json`: proje bağımlılıkları ve önemli script'ler
- `prisma/schema.prisma`: veritabanı şeması
- `prisma/seed.js`: veritabanına örnek veri doldurmak için script
- `app/root.tsx`: projenin giriş noktası
- `app/routes/_index.tsx`: başlıklar listesi sayfası
- `app/routes/_posts.$title.tsx`: başlık sayfası
- `app/routes/post.$id.tsx`: entry sayfası

### İlgili linkler

- https://remix.run/docs/en/main/file-conventions/route-files-v2
- https://remix.run/docs/en/main/route/loader
- https://remix.run/docs/en/main/hooks/use-loader-data
- https://remix.run/docs/en/main/utils/json
- https://remix.run/docs/en/main/utils/redirect
- https://remix.run/docs/en/main/route/action
- https://remix.run/docs/en/main/hooks/use-action-data
- https://remix.run/docs/en/main/components/link
- https://remix.run/docs/en/main/components/form
- https://remix.run/docs/en/main/hooks/use-navigation

## Sunum planı

- who am i
  - twitter.com/frontsideair
  - bsky.app/profile/fatih.6nok.org
  - blog.6nok.org
- objective: let's build eksisozluk
  - remix, typescript, tailwind, prisma, sqlite
- root
  - fs based routing
  - nested routes
  - links, meta
- index
  - loader
  - type safety
  - progressively enhanced links
  - standard response
- posts
  - dynamic segments
  - params
  - throw 404
- post page, edit
  - action
  - standard forms, request, formdata
  - redirect
  - validation
  - make it fast with js
- improvements
  - route error handling
  - optimistic updates
  - stream below the fold with defer
- outro
