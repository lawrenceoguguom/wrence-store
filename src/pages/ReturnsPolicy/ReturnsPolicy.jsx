import './ReturnsPolicy.css'

const ReturnsPolicy = () => {
  return (
    <section className='legal-page'>
      <div className='container legal-page__container'>
        <header className='legal-page__header'>
          <p className='eyebrow'>Helpful guidance</p>
          <h1>Returns Policy</h1>
          <p>We want shopping with us to feel straightforward, clear, and stress-free.</p>
        </header>

        <div className='legal-page__content'>
          <div className='legal-page__section'>
            <p className='legal-page__updated'>Last Updated: October 7, 2026</p>
          </div>

          <div className='legal-page__section'>
            <h2>Return Eligibility</h2>
            <p>
              We may accept returns for eligible items that are in their original condition and have not
              been used, damaged, or altered. Eligibility may vary depending on the product type and the
              circumstances of the order.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Items That Cannot Be Returned</h2>
            <p>
              Certain items may not be eligible for return, including personalised products, damaged
              goods, items that have been worn or altered, and any products specifically noted as non-returnable
              at the time of purchase.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Return Timeframe</h2>
            <p>
              Customers may request a return within the applicable [Return Window]. Please check the product
              page or your order confirmation for any additional guidance specific to your purchase.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Condition of Returned Items</h2>
            <p>
              Items should be returned with their original packaging, labels, and accessories where possible.
              Products that are received damaged, stained, used excessively, or missing original components
              may not be accepted or may be subject to a partial refund.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>How to Request a Return</h2>
            <p>
              To request a return, contact our customer service team using the details below and include
              your order number, the item you wish to return, and a brief reason for the request. We will
              guide you through the next steps and provide instructions for returning the item.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Return Shipping</h2>
            <p>
              Return shipping instructions will be provided once your return request has been reviewed. In
              some cases, the customer may be responsible for the cost of sending the item back, while in
              other cases this may be covered by the store depending on the reason for return.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Inspection Process</h2>
            <p>
              Once a returned item is received, it will be inspected before a refund, exchange, or store
              credit is processed. Delays may occur if the item is returned in poor condition or requires
              additional review.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Refunds</h2>
            <p>
              Approved refunds are typically issued to the original payment method once the return has been
              inspected and accepted. Processing times may vary depending on the payment provider and the
              timing of the return request.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Exchanges</h2>
            <p>
              If a replacement item is available, we may offer an exchange instead of a refund. Exchange
              requests are subject to product availability and the terms of the original order.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Damaged or Incorrect Items</h2>
            <p>
              If your order arrives damaged, incorrect, or incomplete, please contact us as soon as
              possible with clear photos and your order details so we can review the issue and arrange a
              resolution.
            </p>
          </div>

          <div className='legal-page__section'>
            <h2>Contact Information</h2>
            <p>
              If you need help with a return, exchange, or refund request, please contact [Store Name] at
              [Contact Email].
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReturnsPolicy
