import { h } from 'preact'

const Loading = ({ quotation }) => {

  return (
    <div class={`container loading`}>
      <div class='pulse'>
      </div>
      <blockquote class='quotation'>
        <p class='quote'>
          {quotation.quote}
        </p>
        <footer class='author'><cite>{quotation.author}</cite></footer>
      </blockquote>
    </div>
  )
}

export default Loading
