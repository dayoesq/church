<?php

enum BlogStatus : string
{
    case ACTIVE = 'active';
    case PENDING = 'pending';
    case DRAFT = 'draft';
    case ARCHIVED = 'archived';
    case PUBLISHED = 'published';

}
