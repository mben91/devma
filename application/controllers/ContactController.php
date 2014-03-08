<?php

class ContactController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    	
        if($this->_request->isPost()) {
        	
        	$name = $this->_request->getParam('name');
        	$email = $this->_request->getParam('email');
        	$subject = $this->_request->getParam('subject');
        	$comment = $this->_request->getParam('comment');
        	
        	$mail = new Zend_Mail();
		    // $mail->setBodyText('Thank you for submitting your message. we will contact you as soon as possible. Have a nice day!');
		    $mail->setBodyHtml('Thank you for submitting your message. we will contact you as soon as possible. Have a nice day!');
		    $mail->setFrom('ste.devma@gmail.com', 'Devma');
		    $mail->addTo($email, $name);
		    $mail->setSubject('Thank you.');
		    $mail->send();
		    
		    // $mail->setBodyText('Thank you for submitting your message. we will contact you as soon as possible. Have a nice day!');
		    $mail2 = new Zend_Mail();
		    $mail2->setBodyHtml($comment);
		    $mail2->setFrom($email, $name);
		    $mail2->addTo('contact@devma.net', 'Devma');
		    $mail2->setSubject($subject);
		    $mail2->send();
        }
    	
    }


}

