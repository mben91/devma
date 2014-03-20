<?php

class ServicesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        $this->view->headScript()->appendFile('js/other/readmore.js');
    }

}

