import { Link } from 'react-router-dom'
import './InfoPage.css'

const InfoPage = ({
  title,
  description,
  eyebrow = 'Support & information',
  details = [],
}) => {
  return (
    <section className='info-page'>
      <div className='container info-page__container'>
        <div className='info-page__hero'>
          <p className='eyebrow'>{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className='info-page__card'>
          {details.length > 0 ? (
            details.map((item) => (
              <div key={item.title} className='info-page__item'>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            ))
          ) : (
            <div className='info-page__item'>
              <h2>Helpful information</h2>
              <p>
                We’re building this section to give you a polished experience while keeping the
                storefront ready for future content and backend integration.
              </p>
            </div>
          )}
        </div>

        <div className='info-page__actions'>
          <Link to='/' className='primary-button'>Continue shopping</Link>
        </div>
      </div>
    </section>
  )
}

export default InfoPage
