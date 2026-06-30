<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aZxr69zSUF1ghw62RQsFUFRo1yV-NWhK

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Configuração do Supabase

O projeto utiliza o Supabase para persistir as perguntas e respostas.
1. Crie um arquivo `.env` baseado no [.env.example](file:///c:/HSC/pesquisa-hsc/.env.example) para desenvolvimento local.
2. Certifique-se de aplicar as migrations de tabelas e políticas de segurança no banco de dados.

## Hospedagem no Cloudflare Pages

Para publicar e hospedar a aplicação no Cloudflare Pages:

1. Acesse o painel da Cloudflare e vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecione o repositório `pesquisa_hsc`.
3. Configure as opções de Build:
   - **Framework Preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Em **Environment variables (advanced)**, adicione as seguintes variáveis de ambiente:
   - `VITE_SUPABASE_URL`: `https://drbzogwimvaziaydwqfk.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `<SUA_CHAVE_ANON_KEY_PUBLICA>` (disponibilizada no arquivo `.env` local)
5. Clique em **Save and Deploy**. A Cloudflare gerará um link público seguro para acessar o totem de satisfação.

