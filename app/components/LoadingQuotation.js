import { h } from 'preact'

const Loading = ({ quotation }) => {
  return (
    <div class={`container loading`}>
      <div class="frame-group">
        <div class="ring" />
        <blockquote class="quotation">
          <p class="quote">{quotation.quote}</p>
          <footer class="author">
            <cite>{quotation.author}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

export default Loading
