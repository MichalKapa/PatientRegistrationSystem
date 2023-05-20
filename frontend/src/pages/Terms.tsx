import "../styles/Terms.scss";
import "../styles/Base.scss";

function Terms() {
    const numbersArray = Array.from({ length: 20 }, (_, index) => index + 1);
    return (
        <div>
            <div className='terms_wrapper'>
                <h1 className="main_text">Regulamin</h1>
                {numbersArray.map((number) => <p className='terms_p'>{number}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nesciunt consequuntur optio ipsa expedita alias soluta, dignissimos, quibusdam ipsam aut obcaecati suscipit possimus id, dolore harum animi dolor voluptatibus accusantium ipsum saepe dolorum! Voluptates iste voluptatum, maxime dolor suscipit similique alias tempore accusamus, omnis excepturi facilis porro nisi nulla doloremque quia exercitationem dolorem aliquam voluptate debitis vel doloribus illum sunt reiciendis laudantium? Possimus eum dolorem quo est veniam nisi architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nesciunt consequuntur optio ipsa expedita alias soluta, dignissimos, quibusdam ipsam aut obcaecati suscipit possimus id, dolore harum animi dolor voluptatibus accusantium ipsum saepe dolorum! Voluptates iste voluptatum, maxime dolor suscipit similique alias tempore accusamus, omnis excepturi facilis porro nisi nulla doloremque quia exercitationem dolorem aliquam voluptate debitis vel doloribus illum sunt reiciendis laudantium? Possimus eum dolorem quo est veniam nisi architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nesciunt consequuntur optio ipsa expedita alias soluta, dignissimos, quibusdam ipsam aut obcaecati suscipit possimus id, dolore harum animi dolor voluptatibus accusantium ipsum saepe dolorum! Voluptates iste voluptatum, maxime dolor suscipit similique alias tempore accusamus, omnis excepturi facilis porro nisi nulla doloremque quia exercitationem dolorem aliquam voluptate debitis vel doloribus illum sunt reiciendis laudantium? Possimus eum dolorem quo est veniam nisi architecto?</p>)}
            </div>
        </div>
    )
}

export default Terms;