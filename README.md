# Nossa TV - Streaming de TV Premium

![Nossa TV](images/logo.svg)

## 🎯 Sobre o Projeto

Nossa TV é uma plataforma moderna de streaming de TV com mais de 400 canais em Full HD. Este projeto apresenta um site responsivo com design tecnológico, tema dark/light, gradientes modernos e animações suaves.

## ✨ Características

### Design Moderno
- **Tema Dark/Light**: Alternância entre temas com persistência no localStorage
- **Gradientes Avançados**: Cores vibrantes em textos, botões e backgrounds
- **Animações Suaves**: Transições e efeitos ao scroll
- **Glassmorphism**: Efeitos de vidro fosco em cards e modais
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### Funcionalidades
- ✅ Contador animado (400+ canais)
- ✅ Menu mobile responsivo
- ✅ Smooth scroll para navegação
- ✅ Modais dinâmicos para planos
- ✅ Lazy loading para imagens
- ✅ Animações ao scroll (Intersection Observer)
- ✅ Parallax sutil no hero
- ✅ Notificações toast
- ✅ SVGs otimizados e animados

### Tecnologias Utilizadas
- HTML5 semântico
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- JavaScript ES6+ (Intersection Observer, localStorage, DOM Manipulation)
- SVG com gradientes e animações

## 🚀 Como Usar

### Opção 1: Abrir Diretamente
1. Navegue até a pasta do projeto
2. Dê duplo clique em `index.html`
3. O site abrirá no seu navegador padrão

### Opção 2: Servidor Local (Recomendado)

#### Com Python:
```bash
cd "/c/Users/Rafael/OneDrive/Documentos/Rider C#/Nossa_TV/Nossa_TV"
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

#### Com Node.js:
```bash
npx http-server -c-1
```

#### Com PHP:
```bash
php -S localhost:8000
```

## 📁 Estrutura do Projeto

```
Nossa_TV/
├── index.html           # Página principal
├── css/
│   ├── styles.css       # Estilos principais (tema, layout, componentes)
│   └── animations.css   # Animações e keyframes
├── js/
│   └── main.js          # JavaScript (tema, menu, contador, modais)
├── images/
│   ├── logo.svg         # Logo animado
│   ├── hero-tv.svg      # Mockup de TV para hero
│   └── phone.svg        # Mockup de celular
└── README.md            # Este arquivo
```

## 🎨 Paleta de Cores

### Tema Dark (Padrão)
- **Background Primary**: `#0a0e27`
- **Background Secondary**: `#0f1724`
- **Text Primary**: `#e6eef8`
- **Text Secondary**: `#9aa4bf`

### Tema Light
- **Background Primary**: `#f7fafc`
- **Background Secondary**: `#ffffff`
- **Text Primary**: `#0b1220`
- **Text Secondary**: `#4a5568`

### Gradientes
- **Primary**: `#667eea → #764ba2`
- **Accent**: `#4facfe → #00f2fe`
- **Secondary**: `#f093fb → #f5576c`

## ⚡ Performance

- Lazy loading para imagens
- Debounce em eventos de scroll
- Will-change em elementos animados
- Intersection Observer para animações
- CSS otimizado com custom properties
- Respeito a `prefers-reduced-motion`

## 📱 Responsividade

- **Desktop**: > 860px (layout em grid de 2 colunas)
- **Tablet**: 768px - 860px (layout adaptativo)
- **Mobile**: < 768px (layout de coluna única, menu off-canvas)

## 🎭 Funcionalidades Interativas

### Toggle de Tema
Clique no botão (🌙/☀️) no canto superior direito para alternar entre tema dark e light. A preferência é salva no localStorage.

### Menu Mobile
Em telas pequenas, clique no ícone hamburger para abrir/fechar o menu de navegação.

### Contador Animado
O contador de canais (400+) anima automaticamente quando entra na viewport.

### Modais de Planos
Clique em "Assinar Agora" para ver informações de contato em um modal elegante.

## 🔧 Customização

### Mudar Cores
Edite as variáveis CSS em `css/styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    /* ... */
}
```

### Adicionar Novas Seções
Siga a estrutura de seções existentes:
```html
<section class="nova-secao" id="nova">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Título</h2>
            <p class="section-subtitle">Subtítulo</p>
        </div>
        <!-- Seu conteúdo aqui -->
    </div>
</section>
```

## 🐛 Resolução de Problemas

### Imagens não aparecem
- Verifique se a pasta `images/` existe
- Confirme que os arquivos SVG estão na pasta
- Use um servidor local em vez de abrir o arquivo diretamente

### Tema não persiste
- Verifique se o localStorage está habilitado no navegador
- Limpe o cache e tente novamente

### Animações não funcionam
- Verifique se o JavaScript está carregado (console do navegador)
- Confirme que não há erros no console
- Alguns usuários podem ter `prefers-reduced-motion` ativado

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 👨‍💻 Autor

Desenvolvido por Rafael - 2024

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas!

---

**Nossa TV** - Streaming de TV Premium para você e sua família 📺✨
