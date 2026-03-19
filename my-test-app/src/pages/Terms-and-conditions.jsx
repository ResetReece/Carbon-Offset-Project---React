import '../App.css';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function TermsAndConditions() {
  return (
    <div className="page">
      <Nav />

      <div className="title-box">
        <h1 className="company-name">Terms & Conditions</h1>
      </div>

      <div className="background-container">
        <h2>Last Updated: January 15, 2026</h2>

        <h3>Definitions</h3>
        <p>
          "Company" means Rooted Offsets LLC. "Customer" or "you" means the person(s) or company whose order for the
          Goods is accepted by Company. "Goods" means any goods or services which Company is to supply to you. All
          orders are accepted by Company subject to and according to the following terms which override and exclude any
          other terms stipulated, incorporated or referred to by you during any negotiations or in any course of dealing
          between Company and you.
        </p>

        <h3>Sales</h3>
        <p>
          All prices quoted include applicable sales taxes and levies in accordance with the law of Company's
          jurisdiction. Refunds will be approved if requested within 90 business days of all other purchases. To request
          a refund for your Rooted Offsets purchase, send us an email at customersupport@rootedoffsets.com. If you wish
          to enter into a transaction, you may be asked to supply certain relevant information, such as your credit card
          number and its expiration date, your billing address and your shipping information. YOU REPRESENT AND WARRANT
          THAT YOU HAVE THE RIGHT TO USE ANY CREDIT CARD THAT YOU SUBMIT IN CONNECTION WITH A TRANSACTION. By submitting
          such information, you grant to us the right to provide such information to third parties for purposes of
          facilitating transactions. Verification of information may be required prior to the acknowledgment or
          completion of any transaction. By making a transaction, you represent that the applicable products and services
          will be used only in a lawful manner. By making a transaction, you acknowledge that we retain a portion of your
          purchase to pay for operating expenses and as net profits. For example, only, in 2024 Rooted Offsets incurred
          around 30% of sales as business operating costs and retained less than 10% of sales as net profits across online
          and direct business sales. These figures may vary from year to year. Customer also acknowledges that as a result
          of Rooted Offsets's business model of portfolio and volumetric pricing, the percentage of sales allocated to net
          profit, and operating costs may differ for the customer's transaction. Operating and transactional costs include
          but are not limited to registry fees, credit retirement and transfer fees, annual purchase and retirement audits,
          payment processing fees, website hosting and maintenance fees, carbon calculator hosting and development, legal
          fees, employee salaries, and marketing costs.
        </p>

        <p>
          Company will provide reasonable proof of actions for all carbon offset purchases which demonstrate that the
          promised quantity of carbon emissions have been reduced/sequestered. This proof of actions will be available on
          rootedoffsets.com and may include certification by a 3rd party.
        </p>

        <h3>Subscriptions</h3>
        <p>
          When you purchase a subscription, every month Company will bill you in the amount stated at the time of purchase
          using the payment method you specified. Subscriptions begin as soon as you have completed enrollment including
          payment confirmation. Subscriptions renew automatically each month unless you cancel the subscription. Company
          may change its pricing, but you will be given at least 30 days' notice prior to the change. You may cancel
          subscriptions at any time by contacting Company. Company reserves the right to cancel subscription services at
          any time.
        </p>

        <h3>Legal Construction / Force Majeure / Exports</h3>
        <p>
          Company will not be liable to you or be deemed to be in breach of these terms due to any delay in performing or
          any failure to perform any of Company's obligations under these terms if the delay or failure was due to any cause
          beyond Company's reasonable control (which include, but are not limited to: government actions, war, fire,
          explosion, flood, acts of terrorism, import or export regulations or embargoes, labour disputes or inability to
          obtain or a delay in obtaining supplies of Goods or labour). Company may at its option delay the performance of
          or cancel the whole or any part of a purchase. Company reserves the right to modify these terms at any time upon
          prior written notice to you.
        </p>

        <h3>Governing Law</h3>
        <p>
          These terms are governed by laws of the State of Texas, without respect to its conflict of laws principles. The
          sole jurisdiction and venue for any claim arising from the products, services, or these terms shall be the state
          and federal courts located in Texas, and each party hereby consents to the exclusive jurisdiction and venue of
          such courts. These terms constitute the entire agreement between you and Company regarding the subject matter hereof
          and supersede any and all prior or contemporaneous written or oral agreements or understandings between you and
          Company relating to such subject matter. Notices to you (including notices of changes to these terms) may be made
          via posting to the site or by e-mail (including in each case via links), or by regular mail.
        </p>
      </div>

      <Footer />
    </div>
  );
}
